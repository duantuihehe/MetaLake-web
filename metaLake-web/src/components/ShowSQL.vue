<template>
    <div>
    <textarea v-model="sqlQuery" rows="10" cols="50"></textarea>
    <button @click="formatSql">格式化</button>
  </div>
</template>
<script>
import { format } from 'sql-formatter';

export default {
    data(){
        return{
            sqlQuery:this.$route.params.id,
        }
    },
    methods: {
    formatSql() {
        console.log(this.$route.params.id)
      this.sqlQuery = format(this.$route.params.id );
    }
  }
}
</script>
