// Any specialized code that should be included in all AE panels will go here

// ---------------------
// Thanks Adam Plouff
//
let currentTime = null;
let thisComp = setComp();
function setComp() {
  app.activeViewer.setActive();
  thisComp = app.project.activeItem;
  return thisComp || thisComp instanceof CompItem;
}
// ---------------------
