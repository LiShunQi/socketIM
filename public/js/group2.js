define((require, exports, module) => {
   const socket = io.connect('http://localhost:3000/group2');
   module.exports = socket;
});