/* eslint-disable no-underscore-dangle */
const express = require('express');
const fs = require('fs');
const router = express.Router();
const BASE_DIR = __dirname.replace('middlewares', '');
const jsonPath = `${BASE_DIR}\\data\\data.json`;
const bodyParser = require('body-parser');

router.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

router.use(bodyParser.json());
router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.get('/list', (req, res) => {
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    res.end(data);
  });
});
router.get('/get/:id', (req, res) => {
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    const list = JSON.parse(data);
    const { id } = req.params;
    const item = _getItem(list, id);
    res.end(JSON.stringify(item));
  });
});

router.post('/add', (req, res) => {
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    const list = JSON.parse(data);
    const item = req.body;
    const newList = _addItem(list, item);
    const jsonData = JSON.stringify(newList);
    fs.writeFile(jsonPath, jsonData, writeFileErr => {
      if (!writeFileErr) {
        res.end(jsonData);
      } else {
        res.end(data);
      }
    });
  });
});

router.post('/update', (req, res) => {
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    const list = JSON.parse(data);
    const item = req.body;
    const newList = _updateItem(list, item);
    const jsonData = JSON.stringify(newList);

    fs.writeFile(jsonPath, jsonData, writeFileErr => {
      if (!writeFileErr) {
        res.end(jsonData);
      } else {
        res.end(data);
      }
    });
  });
});

router.post('/addchilditem/:id', (req, res) => {
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    const item = req.body;
    const list = JSON.parse(data);
    const { id } = req.params;
    const newList = _addchildItem(list, item, id);
    const jsonData = JSON.stringify(newList);
    fs.writeFile(jsonPath, jsonData, writeFileErr => {
      if (!writeFileErr) {
        res.end(jsonData);
      } else {
        res.end(data);
      }
    });
  });
});
router.post('/delete/:id', (req, res) => {
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    const list = JSON.parse(data);
    const { id } = req.params;
    const newList = _deleteItem(list, id);
    const jsonData = JSON.stringify(newList);

    fs.writeFile(jsonPath, jsonData, writeFileErr => {
      if (!writeFileErr) {
        res.end(jsonData);
      } else {
        res.end(data);
      }
    });
  });
});
router.post('/deletechilditem/:id/:idchild', (req, res) => {
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    const list = JSON.parse(data);
    const { id } = req.params;
    const { idchild } = req.params;
    const newList = _deletechildItem(list, idchild, id);
    const jsonData = JSON.stringify(newList);
    fs.writeFile(jsonPath, jsonData, writeFileErr => {
      if (!writeFileErr) {
        res.end(jsonData);
      } else {
        res.end(data);
      }
    });
  });
});
// Private functions

function _getIndex(list, id) {
  return list.findIndex(item => item.id.toString() === id.toString());
}
// find the current contact in the list
function _getItem(list, id) {
  const currentItem = list[_getIndex(list, id)];
  return currentItem;
}

// Updates a contact and returns an updated list
function _updateItem(list, updateItem) {
  const newList = [...list];
  const currentItemIndex = _getIndex(newList, updateItem.id);
  newList[currentItemIndex] = updateItem;
  return newList;
}

// Return an updated list after delete contact
const _deleteItem = (list, id) => {
  const newList = [...list];
  const currentItemIndex = _getIndex(newList, id);
  newList.splice(currentItemIndex, 1);
  return newList;
};

// Add new contact to contact -list
const _addItem = (list, addedItem) => {
  let lastId = -1;
  if (list.length > 0)
    lastId = parseInt(list[list.length - 1].id.toString(), 10);
  const item = { id: lastId + 1, ...addedItem };
  const newList = [...list];
  newList.push(item);
  return newList;
};

// Add a contact's friend and returns an updated list
function _addchildItem(list, childItem, itemId) {
  const newList = [...list];
  const index = _getIndex(newList, itemId);
  const childrenItem = [...newList[index].friends];
  let newId = -1;
  if (childrenItem.length > 0)
    newId = childrenItem[childrenItem.length - 1].id.toString();
  const newchildItem = { id: parseInt(newId, 10) + 1, ...childItem };
  childrenItem.push(newchildItem);
  newList[index].friends = [...childrenItem];
  return newList;
}

// Deletes a contact's friend and returns an updated list
function _deletechildItem(list, childItemId, itemId) {
  const newList = [...list];
  const index = _getIndex(newList, itemId);
  const childrenItem = [...newList[index].friends];
  const childItemIndex = _getIndex(childrenItem, childItemId);
  childrenItem.splice(childItemIndex, 1);
  newList[index].friends = [...childrenItem];
  return newList;
}

module.exports = router;
