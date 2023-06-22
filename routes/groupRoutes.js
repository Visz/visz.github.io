const express = require('express');
const Group = require('../models/Group');

const router = express.Router();

router.post('/', async (req, res) => {
  const group = new Group(req.body);
  try {
    await group.save();
    res.status(201).send({ group });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/join/:groupId', async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    const spot = group.spots.find(spot => !spot.userName);
    if (spot) {
      spot.userName = req.query.userName;
      spot.role = 'assigned role';
      await group.save();
      res.send({ spot });
    } else {
      res.status(400).send({ error: 'No available spot in the group' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

router.post('/groups', async (req, res) => {
    // Create a new group
    const group = new Group({
      name: req.body.name,
      spots: Array(5).fill({}) // Create 5 empty spots
    });
  
    try {
      // Save the group to the database
      await group.save();
      // Send a response back to the client
      res.status(201).send(group);
    } catch (error) {
      // If something went wrong, send an error message
      res.status(500).send(error);
    }
  });

  router.get('/join/:groupId', async (req, res) => {
    try {
      // Find the group with the given ID
      const group = await Group.findById(req.params.groupId);
      // Find the first empty spot in the group
      const spot = group.spots.find(spot => !spot.userName);
  
      if (spot) {
        // Assign the user to the spot
        spot.userName = req.query.userName;
        spot.role = 'role logic here'; // Add your logic for role assignment
        // Save the updated group to the database
        await group.save();
        // Send a response back to the client
        res.send(spot);
      } else {
        // If no empty spot was found, send an error message
        res.status(400).send({ error: 'No available spot in the group' });
      }
    } catch (error) {
      // If something went wrong, send an error message
      res.status(500).send(error);
    }
  });
  