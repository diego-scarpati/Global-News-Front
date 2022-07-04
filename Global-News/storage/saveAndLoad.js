import storage from "./storage";

// Save something with key only. (using only a keyname but no id)
// This key should be unique. This is for data frequently used.
// The key and value pair is permanently stored unless you remove it yourself.
storage.save({
  key: 'loginState', // Note: Do not use underscore("_") in key!
  data: {
    from: 'some other site',
    userid: 'some userid',
    token: 'some token'
  },

  // if expires not specified, the defaultExpires will be applied instead.
  // if set to null, then it will never expire.
  expires: 1000 * 3600
});

// load
storage
  .load({
    key: 'loginState',

    // autoSync (default: true) means if data is not found or has expired,
    // then invoke the corresponding sync method
    autoSync: true,

    // syncInBackground (default: true) means if data expired,
    // return the outdated data first while invoking the sync method.
    // If syncInBackground is set to false, and there is expired data,
    // it will wait for the new data and return only after the sync completed.
    // (This, of course, is slower)
    syncInBackground: true,

    // you can pass extra params to the sync method
    // see sync example below
    syncParams: {
      extraFetchOptions: {
        // blahblah
      },
      someFlag: true
    }
  })
  .then(ret => {
    // found data go to then()
    console.log(ret.userid);
  })
  .catch(err => {
    // any exception including data not found
    // goes to catch()
    console.warn(err.message);
    switch (err.name) {
      case 'NotFoundError':
        // TODO;
        break;
      case 'ExpiredError':
        // TODO
        break;
    }
  });

// --------------------------------------------------

// Save something with key and id.
// "key-id" data size cannot surpass the size parameter you pass in the constructor.
// By default the 1001st data will overwrite the 1st data item.
// If you then load the 1st data, a catch(NotFoundError) or sync will be invoked.
var userA = {
  name: 'A',
  age: 20,
  tags: ['geek', 'nerd', 'otaku']
};

storage.save({
  key: 'user', // Note: Do not use underscore("_") in key!
  id: '1001', // Note: Do not use underscore("_") in id!
  data: userA,
  expires: 1000 * 60
});

// load
storage
  .load({
    key: 'user',
    id: '1001'
  })
  .then(ret => {
    // found data goes to then()
    console.log(ret.userid);
  })
  .catch(err => {
    // any exception including data not found
    // goes to catch()
    console.warn(err.message);
    switch (err.name) {
      case 'NotFoundError':
        // TODO;
        break;
      case 'ExpiredError':
        // TODO
        break;
    }
  });

// --------------------------------------------------

// get all ids for "key-id" data under a key,
// note: does not include "key-only" information (which has no ids)
storage.getIdsForKey('user').then(ids => {
  console.log(ids);
});

// get all the "key-id" data under a key
// !! important: this does not include "key-only" data
storage.getAllDataForKey('user').then(users => {
  console.log(users);
});

// clear all "key-id" data under a key
// !! important: "key-only" data is not cleared by this function
storage.clearMapForKey('user');

// --------------------------------------------------

// remove a single record
storage.remove({
  key: 'lastPage'
});
storage.remove({
  key: 'user',
  id: '1001'
});

// clear map and remove all "key-id" data
// !! important: "key-only" data is not cleared, and is left intact
storage.clearMap();