define((require, exports, module) => {
   const socket = io.connect('http://localhost:3000/group1');
   module.exports = socket;
});