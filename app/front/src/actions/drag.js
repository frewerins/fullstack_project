export function onDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
  //event.currentTarget.style.backgroundColor = 'yellow';
}

export function onDragOver(event) {
  event.preventDefault();
}

export function onDrop(event) {
  const id = event.dataTransfer.getData('text');
 
  const draggableElement = document.getElementById(id);
  let folder = event.target;
  //console.log(folder.className, folder.className !== "folder");
  /*try {
    while (!folder.className || folder.className !== "folder") {
      console.log(folder);
      folder = folder.ParentElement;
      //console.log(folder);
  }
} catch (err) {
  console.log(err, folder);
  return;
}*/
  folder.appendChild(draggableElement);
  event.dataTransfer.clearData();
}