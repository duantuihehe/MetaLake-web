<template>
    <div>
        
        <div class="selectAction">
            <label for="selectDb">选择库</label>
            <select class="selectDb" v-model="dbName">
                <option v-for="db in databases">{{ db }}</option>
                <option value="{{ databases[0] }}" selected>{{ databases[0] }}</option>
            </select>
            <label for="selectTable">选择表</label>
            <select class="selectTable" @click="getTables" v-model="tableName">
                <option v-for="table in tables">{{ table }}</option>
            </select>
        </div>
        <div class="metaData-dbMeta">

            <table class="table">
                <thead>
                    <tr>
                        <th>表名</th>
                        <th>列名</th>
                        <th>数据类型</th>
                        <th>是否为主键</th>
                        <th>是否可为空</th>
                        <th>注释</th>
                        <th>是否需要同步</th>

                        <!-- <th>位置</th> -->
                    </tr>
                </thead>
                <input type="checkbox" v-model="selectAll" @change="toggleSelectAll"> 全选
                <tbody>
                    <tr v-for="row in tableMetas" :key="row.poistion">
                        <td>{{ row.table }}</td>
                        <td>{{ row.field }}</td>
                        <td>{{ row.type }}</td>
                        <td>{{ row.key ? '是' : '否' }}</td>
                        <td>{{ row.nullAble ? '是' : '否' }}</td>
                        <td>{{ row.comment }}</td>
                        <td><input type="checkbox" id="row.field" :checked="selectedCoumns.includes(row)"
                                @click="selectColumn(row)"></td>
                    </tr>
                </tbody>
                 
                    <button v-if="submitBodyavilible" @click="submitBody">确认</button>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            metas: [],
            tableMetas: [],
            databases: [],
            tables: [],
            dbName: "",
            tableName: "",
            selectAll: false,
            selectedCoumns: [],
            // selectColumns: [],
            sql:null,
            submitBodyavilible:false,
        };
    },
    methods: {
        getTables() {
            axios.post("http://localhost:8080/api/metadata/getTables", {
                "serviceClassName": "com.metalake.service.MysqlMetadataService",
                "dbName": this.dbName,
                "jdbcConfig": {
                    "driverClassName": "com.mysql.jdbc.Driver",
                    "url": "jdbc:mysql://dp-dev-rds.c5s7vgxpiybm.rds.cn-north-1.amazonaws.com.cn:3306/test",
                    "username": "root",
                    "password": "f943pbRvO1j4Nldy"
                }
            }).then(response => {
                this.tables = response.data;
            }).catch(error => {
                console.log(error);
            });
            this.getTableMeatData();
        },
        getTableMeatData() {
            axios.post("http://localhost:8080/api/metadata/getTableMeta", {
                "serviceClassName": "com.metalake.service.MysqlMetadataService",
                "dbName": this.dbName,
                "table": this.tableName,
                "jdbcConfig": {
                    "driverClassName": "com.mysql.jdbc.Driver",
                    "url": "jdbc:mysql://dp-dev-rds.c5s7vgxpiybm.rds.cn-north-1.amazonaws.com.cn:3306/test",
                    "username": "root",
                    "password": "f943pbRvO1j4Nldy"
                }
            }).then(response => {
                this.tableMetas = response.data;
            }).catch(error => {
                console.log(error);
            });
        },
        toggleSelectAll() {
            this.submitBodyavilible=true;
            if (this.selectAll) {
                // 全选
                this.selectedCoumns = this.tableMetas;
            }
            else {
                // 取消全选
                this.selectedCoumns = [];
            }
            console.log(this.selectedCoumns);
        },
        selectColumn(row) {
            this.submitBodyavilible=true;
            if (this.selectedCoumns.includes(row)) {
                this.selectedCoumns = this.selectedCoumns.filter(selectedRow => selectedRow !== row);
            } else {
                this.selectedCoumns.push(row);
            }
            console.log(this.selectedCoumns);
            
        },
        submitBody(){
            axios.post("http://localhost:8080/api/metadata/getDDL", this.selectedCoumns).then(
                response =>{
                    this.sql= response.data;
                    var id=this.sql
                    this.$router.push({ name: 'showSQL', params: { id }})
                }
            );
            console.log("====================")
        }
    },
    computed: {},
    created() {
        console.log("start");
        axios.post("http://localhost:8080/api/metadata/getDatabases", {
            "serviceClassName": "com.metalake.service.MysqlMetadataService",
            "jdbcConfig": {
                "driverClassName": "com.mysql.jdbc.Driver",
                "url": "jdbc:mysql://dp-dev-rds.c5s7vgxpiybm.rds.cn-north-1.amazonaws.com.cn:3306/test",
                "username": "root",
                "password": "f943pbRvO1j4Nldy"
            }
        }).then(response => {
            this.databases = response.data;
        }).catch(error => {
            console.log(error);
        });
    },
    components: {}
}
</script>

<style>
.table {
    border-collapse: collapse;
}

.table th,
.table td {
    border: 1px solid #ccc;
    padding: 8px;
}

.table th {
    background-color: #f2f2f2;
}

.selectAction {
    display: flex;
    justify-content: space-between;
}
</style>
  