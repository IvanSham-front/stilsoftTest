<template>
  <div id="app" class="container">
    <form-el 
    v-on:add-student="addStudent($event)"
    ></form-el>

    <h1 class="text-center">Списки студентов:</h1>
    
    <div id="nav" class="nav nav-tabs">
      <a
        style="cursor: pointer"
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['nav-link', { 'active': currentTab.name === tab.name }]"
        v-on:click="currentTab = tab"
        
      >{{tab.value}}</a>
    </div>

    <keep-alive>
      <component 
      v-bind:is="currentTabComponent"
      v-on:remove-student="removeStudent($event)"
      v-bind:students="currentArr"
      ></component>
    </keep-alive>
  
  </div>
</template>

<script>
import FormEl from './components/FormEl.vue'
import TableAllStudents from './components/tableAllStudents.vue'
import TableFootball from './components/tableFootball.vue'
import TableBoxing from './components/tableBoxing.vue'
import TableChess from './components/tableChess.vue'
import TableDraw from './components/tableDraw.vue'
import obj from './functions/testObject'

export default {
  components: { FormEl, TableAllStudents, TableFootball, TableBoxing, TableChess, TableDraw},
    data() {
      return {
        students: [],
        studentsOnFootball: [],
        studentsOnBoxing: [],
        studentsOnChess: [],
        studentsOnDrawing: [],
        currentTab: {name: 'all-students', value: 'Общий'},
        tabs: [
          {
            name: 'all-students',
            value: 'Общий'
          },
          {
            name: 'football',
            value: 'Футбол'
          },
          {
            name: 'boxing',
            value: 'Бокс'
          },
          {
            name: 'chess',
            value: 'Шахматы' 
          },
          {
            name: 'draw',
            value: 'Рисование'
          }
        ]
      }
    },
    computed: {
      currentTabComponent: function() {
        return "table-" + this.currentTab.name
      },
      currentArr: function() {
        if (this.currentTab.name === 'all-students') {return this.students};
        if (this.currentTab.name === 'football') {return this.studentsOnFootball}
        if (this.currentTab.name === 'boxing') {return this.studentsOnBoxing}
        if (this.currentTab.name === 'chess') {return this.studentsOnChess}
        if (this.currentTab.name === 'draw') {return this.studentsOnDrawing}
      }
    },
    methods: {
      addStudent(studentInfo) {
        this.students.push(studentInfo);
        this.sortedOnSections(studentInfo)
      },
      sortedOnSections(student) {
        if (student.sections.find(item => item === 'Футбол')) {
          this.studentsOnFootball.push(student)
        }
        if (student.sections.find(item => item === 'Бокс')) {
          this.studentsOnBoxing.push(student)
        }
        if (student.sections.find(item => item === 'Шахматы')) {
          this.studentsOnChess.push(student)
        }
        if (student.sections.find(item => item === 'Рисование')) {
          this.studentsOnDrawing.push(student)
        }
      },
      removeStudent(id) {
        let studentsIndex = this.students.findIndex(item => item.id === id);
        let indexFootball = this.studentsOnFootball.findIndex(item => item.id == id);
        let indexBoxing = this.studentsOnBoxing.findIndex(item => item.id == id);
        let indexChess = this.studentsOnChess.findIndex(item => item.id == id);
        let indexDraw = this.studentsOnDrawing.findIndex(item => item.id == id);

        const answerDelete = confirm(`Удалить студента: ${this.students[studentsIndex].surname} из списка?`);
        if (answerDelete) {
          this.students.splice(studentsIndex, 1);
          indexFootball !== -1 ? this.studentsOnFootball.splice(indexFootball, 1) : null;
          indexBoxing !== -1 ? this.studentsOnBoxing.splice(indexBoxing, 1) : null;
          indexChess !== -1 ? this.studentsOnChess.splice(indexDraw, 1) : null;
          indexDraw !== -1 ? this.studentsOnDrawing.splice(indexDraw, 1): null;
        }

      },
    },
    created: function() {
      for (let student of obj) {
        this.students.push(student)
      }
      for (let student of this.students) {
        this.sortedOnSections(student)
      }
    }
}
</script>