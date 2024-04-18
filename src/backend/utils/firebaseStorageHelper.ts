import { getDownloadURL, listAll, StorageReference } from "firebase/storage";

export const myListAll = async (storageRef: StorageReference) => {
  return await listAll(storageRef)
  .then(async (res) => {
    let listFolder = [] as any[];
    res.prefixes.forEach(async (folderRef) => {
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
      listFolder.push({
        strRef: folderRef,
        // name: folderRef.name,
        // path: folderRef.fullPath,
        ...await myListAll(folderRef)
      })
    });
    let listItems = [] as any[];
    res.items.forEach(async (itemRef) => {
      // All the items under listRef.
      listItems.push({
        strRef: itemRef,
        // name: itemRef.name,
        // path: itemRef.fullPath
        downloadUrl: await getDownloadURL(itemRef)
      })
    });
    return {
      strRef: storageRef,
      listFolder, 
      listItems
    }
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });
}