<template>
    <div>
        <slot> </slot>
    </div>
</template>

<style scoped>
   div {
       position: relative;
       margin-left: 0px; 
       margin-top: 0px;
       width: 100%; 
       height: 50px;
       vertical-align: middle; 
       line-height: 50px;
       text-align: center;
       /* border: 1px solid black; */
        -webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0); 
        font-family: sans-serif;
        color: #5B5B5B;
   }
</style>
