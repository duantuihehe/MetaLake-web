<template>
    <div>
        <h3>{{ dbName }}库共有{{ tables.length }}张表</h3>
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
                    <!-- <th>位置</th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in tableMetas" :key="row.poistion">
                    <td>{{ row.table }}</td>
                    <td>{{ row.field }}</td>
                    <td>{{ row.type }}</td>
                    <td>{{ row.key ? '是' : '否' }}</td>
                    <td>{{ row.nullAble ? '是' : '否' }}</td>
                    <td>{{ row.comment }}</td>
                    <!-- <td>{{ row.poistion }}</td> -->

                </tr>
            </tbody>
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
            options: ['选项1', '选项2', '选项3'],
            dbName: '',
            tableName: '',
        }
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
                this.tables = response.data
            }).catch(error => {
                console.log(error)
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
                this.tableMetas = response.data
            }).catch(error => {
                console.log(error)
            });
        },
    },
    computed: {
     
    },
    created() {
        console.log("start")
        
        // axios.post("http://localhost:8080/api/metadata/getAllMeta", {
        //     "serviceClassName": "com.metalake.service.MysqlMetadataService",
        //     "dbName": this.dbName,
        //     "jdbcConfig": {
        //         "driverClassName": "com.mysql.jdbc.Driver",
        //         "url": "jdbc:mysql://dp-dev-rds.c5s7vgxpiybm.rds.cn-north-1.amazonaws.com.cn:3306/test",
        //         "username": "root",
        //         "password": "f943pbRvO1j4Nldy"
        //     }
        // }).then(response => {
        //     this.metas = response.data
        // }).catch(error => {
        //     console.log(error)
        // });
        axios.post("http://localhost:8080/api/metadata/getDatabases", {
            "serviceClassName": "com.metalake.service.MysqlMetadataService",
            "jdbcConfig": {
                "driverClassName": "com.mysql.jdbc.Driver",
                "url": "jdbc:mysql://dp-dev-rds.c5s7vgxpiybm.rds.cn-north-1.amazonaws.com.cn:3306/test",
                "username": "root",
                "password": "f943pbRvO1j4Nldy"
            }
        }).then(response => {
            this.databases = response.data
        }).catch(error => {
            console.log(error)
        });

    }
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
  