<template>
    <div class="alert">
        <slot></slot>
    </div>
</template>
<style scoped>
    .alert{
        padding: 1rem;
        font-weight: 900;
        text-transform: uppercase;
        font-size: 1.6rem;
        text-align: left;
        background-color: var(--white);
        border-left: 0.5rem solid red;
        color:red;
    }
</style>