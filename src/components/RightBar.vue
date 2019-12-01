<template>
    <div>
        <h1> Courseworks </h1>
        <slot> </slot>
    </div>
</template>

<style scoped>
    div {
        box-sizing: border-box;
        width: 30vw; 
        height: 100vh; 
        margin-right: 0px; 
        margin-left: 70vw;
        position: fixed;
        background-color: #88BEFA;
        -webkit-box-shadow: -10px 0px 20px 0px rgba(0, 0, 0, 0.5); 
    }
    h1 {
        color: #3F3F3F;    
        text-align: center;    
        margin-top: 20px;
        margin-bottom: 50px;
    }
    
</style>
