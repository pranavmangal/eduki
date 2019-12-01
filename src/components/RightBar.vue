<template>
  <div>
    <h1>Courseworks</h1>
    <slot></slot>
  </div>
</template>

<style scoped>
div {
  box-sizing: border-box;
  width: 20vw;
  height: 100vh;
  margin-right: 0px;
  /* margin-left: 70vw; */
  position: fixed;
  background-color: #1976d2;
  color: white !important;
}
h1 {
  color: white;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>
