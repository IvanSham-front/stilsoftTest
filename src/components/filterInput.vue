<template>
    <input type="text"
    class="form-control"
    v-bind:value="filterValue"
    @input="$emit('input', $event.target.value)"
    placeholder="search"
    />
</template>

<script>
export default {
    name: 'FilterInput',
    props: ['filterValue']
}
</script>