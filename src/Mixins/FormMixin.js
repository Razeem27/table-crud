import Axios from "@/Api/Axios";

let FormData = {
  data() {
    return {
      sname: "",
      sgender: "",
      maths: "",
      physics: "",
      english: "",
    };
  },
  methods: {
    clear() {
      this.sname = "";
      this.sgender = "";
      this.maths = "";
      this.physics = "";
      this.english = "";
    },
    getTotal() {
      return this.maths + this.physics + this.english;
    },
    async handleSubmit() {
      let newData = {
        name: this.sname,
        gender: this.sgender,
        physics: this.physics,
        maths: this.maths,
        english: this.english,
        total: this.getTotal(),
      };
      console.log(newData);
      await Axios.post("/student", newData);
      this.$router.push("/");
      this.$vToastify.success("successfully created");
    },
  },
};

export default FormData;
