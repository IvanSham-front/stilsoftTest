<template>
  <div>
    <filter-input
      v-model="filterValue"
      ></filter-input>
      
    <table class="table">
        <thead>
            <tr v-on:click="headClick">
                <th data-sort='name'>
                    <arrow-down v-if="sort==='name'"/>
                    <arrow-up v-if="sort!=='name'"/>
                    Имя</th>
                <th data-sort='surname'>
                    <arrow-down v-if="sort==='surname'"/>
                    <arrow-up v-if="sort!=='surname'"/>
                    Фамилия</th>
                <th data-sort='email'>
                    <arrow-down v-if="sort==='email'"/>
                    <arrow-up v-if="sort!=='email'"/>
                    Электронная почта</th>
                <th data-sort='phone'>
                    <arrow-down v-if="sort==='phone'"/>
                    <arrow-up v-if="sort!=='phone'"/>
                    Номер телефона</th>
                <th data-sort='date'>
                    <arrow-down v-if="sort==='date'"/>
                    <arrow-up v-if="sort!=='date'"/>
                    Дата рождения</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(student, index) in paginatedStudents"
            :key="index"
            >
                <td>{{student.name}}</td>
                <td>{{student.surname}}</td>
                <td>{{student.email}}</td>
                <td>{{student.phoneNumber}}</td>
                <td>{{student.dateBirth}}</td>
            </tr>
        </tbody>
    </table>

    <paginator
        v-if="students.length > perPage"
        v-on:page-changed="onPageChange($event)"
        :listData="filterStudents()"
        :currentPage="currentPage"
      />
    </div>
</template>

<script>
import sortDataDown from '../functions/sortDataDown'
import sortDataUp from '../functions/sortDataUp'
import arrowUp from '../components/arrows/arrowUp.vue'
import arrowDown from '../components/arrows/arrowDown.vue'
import Paginator from './paginator.vue'
import FilterInput from './filterInput.vue'

export default {
    name: 'TableBoxing',
    props: ['students'],
    components: {arrowUp, arrowDown, Paginator, FilterInput},
    data() {
      return {
        sort: '',
        currentPage: 1,
        perPage: 10,
        sortStudents: '',
        filterValue: ''
      }
    },
    methods: {
      headClick(event) {
        const sort = event.target.dataset.sort;
        if (!sort) {return};

        if (sort === this.sort) {
          this.sort = '';
          this.students = sortDataDown(this.students, sort)
        } else {
          this.sort = sort;
          this.students = sortDataUp(this.students, sort)
        }
      },
      onPageChange(page) {
        this.currentPage = page
      },
      filterStudents() {
        const students = this.students
        return (
          students.filter(student => {
            if (this.filterValue==='') {
              return students
            } else {
                for (let key in student) {
                  if (typeof student[key] == 'string' && student[key].toLowerCase().includes(this.filterValue.toLowerCase())) {
                     return student
                  }
                }
            }
          })
        )
      },
    },
    computed: {
      paginatedStudents() {
        return (this.filterStudents().slice(this.perPage*(this.currentPage-1), (this.perPage*(this.currentPage-1))+this.perPage))
      },
    },
}
</script>