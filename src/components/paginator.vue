<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center container-fluid">

            <li :class="['page-item', {'active' : number === currentPage}]"
                v-for="number in pageCount"
                :key="number"
            >
                <a class="page-link"
                v-on:click.prevent="onClickPage(number)"
                >{{number}}</a>
            </li>

        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Paginator',
    data() {
        return {
            sizePage: 10,
        }
    },
    props: {
            currentPage: {
                type: Number,
                required: true
            },
            listData: {
                type: Array
            }
        },
    computed: {
        pageCount() {
            let l = this.listData.length,
            s = this.sizePage;
            return Math.ceil(l/s)
        }
    },
    methods: {
        onClickPage(page) {
            this.currentPage = page
            this.$emit('page-changed', page)
        },
        onClickPerPage() {
            this.$emit('page-changed', this.currentPage - 1);
        },
        onClickNextPage() {
            this.$emit('page-changed', this.currentPage + 1);
        }

    }
}
</script>