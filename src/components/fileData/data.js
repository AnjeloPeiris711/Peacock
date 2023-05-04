// chrome.storage.local.get('data/file.json', function(data) {
//         // Convert the retrieved data to a string
//     const fileData = String.fromCharCode.apply(null, new Uint16Array(data['text.txt']));
//         // Do something with the file data
//     console.log(fileData);
//     const explorer = fileData
//     module.exports = explorer;
//     });
export const explorer=()=>{
return fetch('data/file.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return data
    // console.log("ex:",explorer)
  })
  .catch(error => {
    console.error('Error:', error);
  });
}  
// let explorer;
// fetch('data/file.json')
//   .then(response => response.json())
//   .then(data => {
//     explorer = data;
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

// export function getExplorer() {
//   return explorer;
// }


