import React, { Component } from "react";
import update from "immutability-helper";
import { graphql, compose } from "react-apollo";
import Button from "material-ui/Button";
import AddIcon from "material-ui-icons/Add";
import throttle from "lodash/throttle";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import { LabelRadio } from "material-ui/Radio";
import Grid from "material-ui/Grid";
import Tabs, { Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import Select from 'react-select';

import KanbanBoard from "./_KanbanBoard";
import SearchPackages from "./_SearchPackages";

import UPDATE_USER_PACKAGES_MUTATION from "../../mutations/updateUserPackages";
import UPDATE_USER_BOARDS_MUTATION from "../../mutations/updateUserBoards";
import USER_QUERY from '../../queries/user';

import 'react-select/dist/react-select.css';

class KanbanBoardContainer extends Component {
  state = {
    cards: this.props.cards,
    isAddPackageModalOpen: false,
    isAddBoardModalOpen: false,
    addBoardName: "",
    packageSearchText: "",
    packageStatus: "",
    selectedBoard: "",
    tabIndex: 0,
    currentBoard: "All"
  };

  updateCardStatus = (cardId, listId) => {
    // Find the index of the card
    let cardIndex = this.state.cards.findIndex(card => card.id === cardId);
    // Get the current card
    let card = this.state.cards[cardIndex];
    // Only proceed if hovering over a different list
    if (card.status !== listId) {
      // set the component state to the mutated object
      this.setState(
        update(this.state, {
          cards: {
            [cardIndex]: {
              status: { $set: listId }
            }
          }
        })
      );
    }
  };

  updateCardPosition = (cardId, afterId) => {
    // Only proceed if hovering over a different card
    if (cardId !== afterId) {
      // Find the index of the card
      let cardIndex = this.state.cards.findIndex(card => card.id === cardId);
      // Get the current card
      let card = this.state.cards[cardIndex];
      // Find the index of the card the user is hovering over
      let afterIndex = this.state.cards.findIndex(card => card.id === afterId);
      // Use splice to remove the card and reinsert it a the new index
      this.setState(
        update(this.state, {
          cards: {
            $splice: [[cardIndex, 1], [afterIndex, 0, card]]
          }
        })
      );
    }
  };

  updateUserPackages = async () => {
    console.log("updating user packages");
    // console.table(this.state.cards)

    try {
      const response = await this.props.updateUserPackages({
        variables: {
          id: this.props.user.id,
          packages: this.state.cards
        }
      });
      console.log("user packages updated");
      console.table(response.data.updateUser.packages);
      this._handlePackageModalClose()
    } catch (e) {
      console.error(e);
      this._handlePackageModalClose()
    }
  };

  _addCard = (card) => {
    // Keep a reference to the original state prior to the mutations
    // in case we need to revert the optimistic changes in the UI
    // let prevState = this.state;

    // Create a new object and push the new card to the array of cards
    let nextState = update(this.state.cards, { $push: [card] });

    // set the component state to the mutated object
    this.setState({ cards: nextState });
  };

  _removeCard = (id) => {
    // Filter out selected card
    let nextState = [...this.state.cards].filter(card => card.id !== id)

    this.setState({ cards: nextState }, this.updateUserPackages)
  }

  _handlePackageModalOpen = () => {
    this.setState({ isAddPackageModalOpen: true });
  };

  _handlePackageModalClose = () => {
     this.setState({ isAddPackageModalOpen: false });
  }

  _handlePackageStatus = (e) => {
    this.setState({ packageStatus: e.target.value });
  };

  _handlePackageSelect = (pkg) => {
    const { id, name, avatar, description, stars } = pkg
    const { packageStatus, selectedBoard } = this.state

    const data = { 
      id, 
      name, 
      avatar, 
      description, 
      stars,
      status: packageStatus,
      board: selectedBoard
    }

    this._addCard(data)
  }

  _handleTabChange = (event, tabIndex) => {
    const currentBoard = this.props.user.kanbanBoards[tabIndex]
    let cards = this.props.cards

    if (currentBoard !== "All") {
      cards = [...cards].filter((card) => {
        return card.board === currentBoard
      })
    }
    this.setState({ tabIndex, currentBoard, cards });
  };

  _handleAddBoardModalOpen = () => {
    this.setState({ isAddBoardModalOpen: true });
  };

  _handleAddBoardModalClose = () => {
     this.setState({ isAddBoardModalOpen: false });
  }

  _handleAddBoardNameChange = (e) => {
    this.setState({ addBoardName: e.target.value })
  }

  _handleAddBoard = async () => {
    const { user } = this.props
    console.log(`adding ${this.state.addBoardName} to user boards`);

    try {
      const response = await this.props.updateUserBoards({
        variables: {
          id: user.id,
          kanbanBoards: [...user.kanbanBoards, this.state.addBoardName]
        },
        update: (store, { data: { updateUser } }) => {
          const kanbanBoards = updateUser.kanbanBoards
          // Triggers component re-render
          store.writeQuery({ 
            query: USER_QUERY,
            data: { ...user, kanbanBoards }
          })
        }
      });

      console.log("user boards updated");
      console.log(response.data.updateUser);

      this._handleAddBoardModalClose()

      const boards = response.data.updateUser.kanbanBoards
      const tabIndex = boards.length - 1
      const currentBoard = boards[tabIndex]
      
      this.setState({ addBoardName: "", tabIndex, currentBoard })
    } catch (e) {
      console.error(e);

      this._handleAddBoardModalClose()
      this.setState({ addBoardName: "" })
    }
  };

  _handleRemoveBoard = async () => {
    const currentBoard = this.state.currentBoard
    if (currentBoard === "All") {
      alert('Not allowed to remove All')
      return
    }

    console.log(`removing ${currentBoard} from user boards`);

    try {
      const response = await this.props.updateUserBoards({
        variables: {
          id: this.props.user.id,
          boards: [...this.props.user.boards].filter((board) => {
            return board !== currentBoard
          })
        },
        update: (store, { data: { updateUser } }) => {
          const kanbanBoards = updateUser.kanbanBoards
          // Triggers component re-render
          store.writeQuery({ 
            query: USER_QUERY,
            data: { ...this.props.user, kanbanBoards }
          })
        }
      });

      console.log("user boards updated");
      console.log(response.data.updateUser);
      this.setState({ tabIndex: 0 })
    } catch (e) {
      console.error(e);
      this.setState({ tabIndex: 0 })
    }
  }

  _formatBoardSelectItems = () => {
    const { kanbanBoards } = this.props.user
    const arr = []

    for (let item in kanbanBoards) {
      const board = kanbanBoards[item]
      arr.push({ label: board, value: board })
    }
    return arr;
  }

  _handleBoardSelection = (option) => {
    this.setState({ selectedBoard: option.value })
  }

  render() {
    const { user } = this.props;
    const boardSelectOptions = this._formatBoardSelectItems()

    return (
      <div>
        <Grid container>
          <Grid item xs={9} style={{ paddingTop: 0 }}>
            <Tabs 
              index={this.state.tabIndex} 
              onChange={this._handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
              style={{ marginBottom: '20px' }}
            >
              {
                user.kanbanBoards.map((board) => {
                  return (
                    <Tab key={board} label={board} />
                  )
                })
              }
            </Tabs>
          </Grid>
          <Grid item xs={3}>
            <Grid direction="row" container justify='flex-end'>
              <Grid item>
                {
                  false &&
                  <Button raised style={{ marginRight: '10px' }}>Subscribe</Button>
                }
                {
                  this.state.currentBoard !== "All" &&
                  <Button 
                    raised 
                    onClick={this._handleRemoveBoard}
                    style={{ marginRight: '10px' }}
                  >
                    Remove Board
                  </Button>
                }
                <Button 
                  raised 
                  onClick={this._handleAddBoardModalOpen}
                >
                  Add Board
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <KanbanBoard
          cards={this.state.cards}
          cardCallbacks={{
            updateStatus: throttle(this.updateCardStatus),
            updatePosition: throttle(this.updateCardPosition, 500),
            persistCardDrag: this.updateUserPackages,
            removeCard: this._removeCard
          }}
        />
        <Button
          fab
          color="primary"
          style={{ position: "sticky", bottom: "20px", left: '100%' }}
          onClick={this._handlePackageModalOpen}
        >
          <AddIcon />
        </Button>

        {/* Add Board */}
        <Dialog
          open={this.state.isAddBoardModalOpen}
          onRequestClose={this._handleAddBoardModalClose}
        >
          <DialogTitle>Add Board</DialogTitle>
          <DialogContent style={{ width: "500px", marginBottom: '20px' }}>
            <TextField
              autoFocus
              type="text"
              InputProps={{ placeholder: 'Add Board Name' }}
              style={{ width: '100%' }}
              marginForm
              onChange={(e) => this._handleAddBoardNameChange(e)}
              value={this.state.addBoardName}
            />
          </DialogContent>
          <DialogActions>
            <Button className="mr3" onTouchTap={this._handleAddBoardModalClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              raised
              color="primary"
              disabled={!this.state.addBoardName}
              onTouchTap={this.handleAddBoard}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Add Package */}
        <Dialog
          open={this.state.isAddPackageModalOpen}
          onRequestClose={this._handlePackageModal}
        >
          <DialogTitle>Add Package</DialogTitle>
          <DialogContent style={{ width: "500px", marginBottom: '30px' }}>
            <Select
              options={boardSelectOptions}
              placeholder="Select Board"
              value={this.state.selectedBoard}
              onChange={this._handleBoardSelection}
              autofocus
              style={{ marginBottom: "20px" }}
            />
            <div style={{ marginBottom: "20px" }}>
              <LabelRadio 
                label="Backlog" 
                value="backlog"
                checked={this.state.packageStatus === 'backlog'}
                onChange={this._handlePackageStatus}
              />
              <LabelRadio 
                label="Staging" 
                value="staging"
                checked={this.state.packageStatus === 'staging'}
                onChange={this._handlePackageStatus}
              />
              <LabelRadio 
                label="Production" 
                value="production"
                checked={this.state.packageStatus === 'production'}
                onChange={this._handlePackageStatus}
              />
              <LabelRadio 
                label="Archive" 
                value="archive"
                checked={this.state.packageStatus === 'archive'}
                onChange={this._handlePackageStatus}
              />
            </div>
            <SearchPackages 
              _handlePackageSelect={this._handlePackageSelect}
              packageStatus={this.state.packageStatus}
            />
          </DialogContent>
          <DialogActions>
            <Button className="mr3" onTouchTap={this._handlePackageModalClose}>
              Cancel
            </Button>
            <Button
              raised
              color="primary"
              disabled={!this.state.packageStatus || !this.state.selectedBoard}
              onTouchTap={this.updateUserPackages}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default compose(
  graphql(UPDATE_USER_PACKAGES_MUTATION, { name: "updateUserPackages" }),
  graphql(UPDATE_USER_BOARDS_MUTATION, { name: "updateUserBoards" })
)(KanbanBoardContainer)