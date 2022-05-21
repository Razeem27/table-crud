<template>
  <v-container>
    <v-simple-table class="table-1" elevation-5>
      <template v-slot:default>
        <thead>
          <tr>
            <th
              class="text-center heading-tr"
              v-for="(item, index) in headers"
              :key="index"
              @click="handleSort"
            >
              {{ item }}
              <v-icon
                v-if="!(item == 'Modify' || item == 'gender')"
                class="black--text arrow-icon"
                >fa-solid fa-arrow-down</v-icon
              >
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pageList" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.gender }}</td>
            <td>{{ item.physics }}</td>
            <td>{{ item.maths }}</td>
            <td>{{ item.english }}</td>
            <td>{{ item.total }}</td>
            <td class="d-flex justify-space-around">
              <v-btn color="primary" @click="handleEdit(item.id)">Edit</v-btn>
              <v-btn color="red white--text" @click="handleDelete(item.id)"
                >Delete</v-btn
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-row class="footer">
      <!-- <v-spacer></v-spacer> -->

      <v-col cols="2" class="d-flex align-baseline justify-center">
        <label for="" width="9" class="mx-3">Rows</label>
        <v-select
          v-model="pageLimit"
          :items="[5, 10, 15]"
          id="selectRow"
        ></v-select>
      </v-col>
      <v-col cols="8" class="d-flex justify-center align-center">
        <v-icon @click="PreBtn()" class="mr-3 p-btn"> fa-solid fa-less-than </v-icon>
        <v-btn
          class="mx-2 page-btn"
          retain-focus-on-click=false
          fab
          dark
          small
          :color="currentPage == item ? 'red' : 'primary'"
          v-for="(item, index) in maxpage"
          :key="index"
          @click="currentPage = item"
        >
          {{ item }}
        </v-btn>
        <v-icon @click="NextBtn()" class="ml-3 p-btn"> fa-solid fa-greater-than </v-icon>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="2" class="d-flex align-center justify-center">
        <label for="">{{ rowRage }} of {{ list.length }}</label>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Axios from "@/Api/Axios";

export default {
  name: "Home",
  data() {
    return {
      list: [],
      pageLimit: 5,
      pageList: [],
      currentPage: 1,
      headers: [
        "name",
        "gender",
        "physics",
        "maths",
        "english",
        "total",
        "Modify",
      ],
      currentStudent: {},
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    pageLimit() {
      this.currentPage = 1;
      this.setPagination();
    },
    currentPage() {
      this.setPagination();
    },
    list() {
      setTimeout(() => {
        console.log(document.getElementsByClassName("page-btn")[0]);
      }, 50);
    },
    immediate: true,
  },
  computed: {
    rowRage() {
      return `${this.pageLimit * this.currentPage - this.pageLimit}-${
        this.list.length
      }`;
    },
    maxpage() {
      return Math.ceil(this.list.length / this.pageLimit);
    },
  },
  methods: {
    async fetchData() {
      let res = await Axios.get("/student");
      this.list = res.data;
      this.setPagination();
    },

    setPagination() {
      let start = this.currentPage * this.pageLimit - this.pageLimit;
      let end = this.currentPage * this.pageLimit;
      this.pageList = this.list.slice(start, end);
      console.log(this.pageList);
    },
    NextBtn() {
      console.log("next button");
      let maxpages = this.maxpage;
      if (this.currentPage >= maxpages) return;
      this.currentPage += 1;
      this.setPagination();
    },
    PreBtn() {
      if (this.currentPage <= 1) return;
      this.currentPage -= 1;
      this.setPagination();
    },
    async handleDelete(id) {
      await Axios.delete(`/student/${id}`);
      this.fetchData();
      this.$vToastify.success("successfully deleted");
    },
    handleEdit(id) {
      this.$router.push(`/edit/${id}`);
    },
    getSorted(arrow, content) {
      this.list.sort((a, b) => {
        if (arrow.classList.contains("rotate"))
          return a[content] > b[content] ? 1 : -1;
        return a[content] < b[content] ? 1 : -1;
      });
      this.setPagination();
      arrow.classList.toggle("rotate");
    },
    handleSort(e) {
      let content = e.target.innerText.trim();
      console.log(typeof content);
      if (content === "") {
        let arrow = e.target;
        this.getSorted(arrow, content);
        return;
      } else {
        let arrow = e.target.children[0];
        this.getSorted(arrow, content);
      }
    },
  },
};
</script>

<style scoped>
.table-1 {
  border: solid 1px rgb(213, 205, 205);
}
.table-1 td,
th{
  border-left: solid 1px rgb(232, 222, 222);
  text-align:center;

}
.inputRow {
  width: 0.5rem !important;
}
.arrow-icon {
  font-size: 0.9rem !important;
  margin-left: 1rem;
  opacity: 0 !important;
  transition: 0.4s;
}
.rotate {
  transform: rotate(180deg) !important;
}
th:hover .arrow-icon {
  opacity: 1 !important;
}

#selectRow {
  width: 1rem !important;
}
.btn-active {
  background: red !important;
}
.p-btn{
  font-size:1.2rem !important;
  color:rgba(0, 0, 0, 0.603) !important; 
}
.heading-tr{
  font-size:1rem !important;
}

</style>
