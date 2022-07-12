import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: 1000 * 3600 * 24,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  // sync: {
  //   // we'll talk about the details later.
  //   async user(params) {
  //     let {
  //       id,
  //       syncParams: { extraFetchOptions, someFlag }
  //     } = params;
  //     const response = await fetch('user/?id=' + id
  //     // ,{...extraFetchOptions}
  //     );
  //     const responseText = await response.text();
  //     console.log(`user${id} sync resp: `, responseText);
  //     const json = JSON.parse(responseText);
  //     if (json && json.user) {
  //       storage.save({
  //         key: 'user',
  //         id,
  //         data: json.user
  //       });
  //       // if (someFlag) {
  //       //   // do something for some custom flag
  //       // }
  //       // return required data when succeed
  //       return json.user;
  //     } else {
  //       // throw error when failed
  //       throw new Error(`error syncing user${id}`);
  //     }
  //   }
  // }
});

export default storage;