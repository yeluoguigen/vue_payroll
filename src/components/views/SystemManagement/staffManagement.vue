<template>
  <div class="staffSet">
    <div class>
      <!-- 搜索 -->
      <div class="handle-box">
        <div>
          <div class="headerTitle"  @click="dialogFormVisible = true">
            <i class="el-icon-circle-plus-outline headerIcon"></i>
            <span>添加</span>
          </div>
          <span style="color:#606266">批次 : </span>
          <el-date-picker
            v-model="download_Month"
            type="month"
            placeholder="选择批次"
            value-format="yyyyMM">
          </el-date-picker>
          <div class="headerTitle" @click="download">
            <i class="el-icon-download headerIcon"></i>
            <span>导出</span>
          </div>
        </div>
        <div class="staffSerchList">
          <div class="staffSerchList1">
            <span style="color:#606266">员工工号：</span>
            <el-input
              style="width:70%;"
              @input="userChange"
              v-model.trim="user_Id"
              placeholder="请输入员工工号搜索"
            ></el-input>
          </div>
          <div class="staffSerchList1">
            <span style="color:#606266">部门：</span>
            <el-input
              style="width:70%;"
              @input="userChange"
              v-model.trim="staff_Dept"
              placeholder="请输入部门搜索"
            ></el-input>
          </div>
          <div class="staffSerchList1">
            <span style="color:#606266">批次 : </span>
            <el-date-picker
              v-model="Month"
              type="month"
              placeholder="选择批次"
              value-format="yyyyMM">
            </el-date-picker>
          </div>
        </div>
        <div class="staffSerchBtn">
          <el-button type="primary" icon="search" @click="searchUser">搜索</el-button>
          <el-button type="primary" @click="reset_serach">重置</el-button>

        </div>
      </div>
      <el-table :data="tableData" border>
        <el-table-column fixed label="工号" prop="staff_id" align="center" width="80"></el-table-column>
        <el-table-column label="部门" prop="staff_dept" align="center"></el-table-column>
        <el-table-column label="姓名" prop="staff_name" align="center"></el-table-column>
        <el-table-column label="入职时间" prop="date_enroll" align="center"></el-table-column>
        <el-table-column label="职位" prop="staff_position" align="center"></el-table-column>
        <!-- <el-table-column label="基本工资" prop="baseSalary" align="center"></el-table-column> -->
        <el-table-column label="基本工资" prop="basic_salary" align="center"></el-table-column>
        <el-table-column label="全勤天数" prop="full_attendance" align="center"></el-table-column>
        <el-table-column label="实际出勤天数" prop="actual_attendance" align="center"></el-table-column>
        <el-table-column label="批次" prop="pay_roll_date" align="center"></el-table-column>
        <el-table-column label="备注" prop="remark" align="center"></el-table-column>
        <el-table-column label="操作" width="120px" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editUser(scope.$index, scope.row)" size="small">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 页码 -->
      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper"
          :current-page.sync="currentPage"
          :page-size= "pageSize"
          :total= "total"
        ></el-pagination>
      </div>
    </div>
    <!-- 新增用户 -->
    <el-dialog :inline="true" title="新增" :visible.sync="dialogFormVisible">
      <el-form :inline="true" v-model="ruleFormAdd">
        <el-form-item
          label="企业名称"
          prop="company"
          :label-width="formLabelWidth"
        >
          <span>{{this.$store.state.user_company}}</span>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-select v-model="ruleFormAdd.staff_dept" placeholder="请选择">
            <el-option
              v-for="item in staff_deptList"
              :key="item.id"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号" :label-width="formLabelWidth">
          <el-input v-model.trim="ruleFormAdd.staff_id"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model.trim="ruleFormAdd.staff_name"></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model.trim="ruleFormAdd.staff_position"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="ruleFormAdd.date_enroll"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="基本工资" :required="true" :label-width="formLabelWidth">
          <el-input v-model.trim="ruleFormAdd.basic_salary"></el-input>
        </el-form-item>
        <el-form-item label="币种" :label-width="formLabelWidth">
          <el-radio-group v-model="ruleFormAdd.CNY_USD">
            <el-radio label="USD">$</el-radio>
            <el-radio label="CNY">￥</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工资" :label-width="formLabelWidth">
          <el-input v-model.trim="ruleFormAdd.salary"></el-input>
        </el-form-item>
        <el-form-item label="全勤天数" :required="true" :label-width="formLabelWidth">
          <el-input v-model.trim="ruleFormAdd.full_attendance"></el-input>
        </el-form-item>
        <el-form-item label="未出勤天数" :label-width="formLabelWidth">
          <el-input v-model.trim="ruleFormAdd.no_attendance"></el-input>
        </el-form-item>
        <el-form-item label="实际出勤天数" :required="true" :label-width="formLabelWidth">
          <el-input v-model.trim="ruleFormAdd.actual_attendance"></el-input>
        </el-form-item>
        <el-form-item label="绩效工资" :label-width="formLabelWidth">
          <el-input v-model.trim="ruleFormAdd.performance_pay"></el-input>
        </el-form-item>
        <el-form-item label="纳税工资" :label-width="formLabelWidth">
          <el-input v-model.trim="ruleFormAdd.basic_taxible_salar"></el-input>
        </el-form-item>
        <el-form-item label="代扣税金" :label-width="formLabelWidth">
          <el-input v-model.trim="ruleFormAdd.tax_deduction"></el-input>
        </el-form-item>
        <el-form-item label="应收工资" :label-width="formLabelWidth">
          <el-input v-model.trim="ruleFormAdd.salary_receivable"></el-input>
        </el-form-item>
        <el-form-item label="其他扣款" :label-width="formLabelWidth">
          <el-input v-model.trim="ruleFormAdd.other_deduction"></el-input>
        </el-form-item>
        <el-form-item label="实发工资人民币" :label-width="formLabelWidth">
          <el-input v-model.trim="ruleFormAdd.final_salary_CNY"></el-input>
        </el-form-item>
        <el-form-item label="实发工资美金" :label-width="formLabelWidth">
          <el-input v-model.trim="ruleFormAdd.final_salary_USD"></el-input>
        </el-form-item>
        <el-form-item label="批次" :required="true" :label-width="formLabelWidth">
          <el-date-picker
            v-model="ruleFormAdd.pay_roll_date"
            type="month"
            placeholder="选择批次"
            value-format="yyyyMM">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="处理状态" :label-width="formLabelWidth">
          <el-select v-model="ruleFormAdd.process_status" placeholder="请选择">
            <el-option
              v-for="item in process_statusList"
              :key="item.id"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="ruleFormAdd.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户 -->
    <el-dialog :inline="true" title="修改" :visible.sync="editFormVisible">
      <el-form :inline="true" v-model="editForm" ref="editForm">
        <el-form-item label="企业名称" prop="company" :label-width="formLabelWidth">
          <el-input v-model.trim="editForm.company" ></el-input>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-select v-model="editForm.staff_dept" placeholder="请选择">
            <el-option
              v-for="item in staff_deptList"
              :key="item.id"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="staff_id" :label-width="formLabelWidth">
          <el-input v-model.trim="editForm.staff_id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="staff_name" :label-width="formLabelWidth">
          <el-input v-model.trim="editForm.staff_name" ></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="date_enroll" :label-width="formLabelWidth">
          <el-input v-model.trim="editForm.date_enroll" ></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="staff_position" :label-width="formLabelWidth">
          <el-input v-model.trim="editForm.staff_position"></el-input>
        </el-form-item>
        <el-form-item label="基本工资" prop="basic_salary" :label-width="formLabelWidth">
          <el-input v-model.trim="editForm.basic_salary"></el-input>
        </el-form-item>
        <el-form-item label="币种" :label-width="formLabelWidth">
          <el-radio v-model="editForm.CNY_USD" :label="USD">$</el-radio>
          <el-radio v-model="editForm.CNY_USD" :label="CNY">￥</el-radio>
        </el-form-item>
        <el-form-item label="全勤天数" prop="full_attendance" :label-width="formLabelWidth">
          <el-input v-model.trim="editForm.full_attendance"></el-input>
        </el-form-item>
        <el-form-item label="未出勤天数" :label-width="formLabelWidth">
          <el-input v-model.trim="editForm.no_attendance"></el-input>
        </el-form-item>
        <el-form-item label="实际出勤天数" prop="actual_attendance" :label-width="formLabelWidth">
          <el-input v-model.trim="editForm.actual_attendance"></el-input>
        </el-form-item>
        <el-form-item label="绩效工资" :label-width="formLabelWidth">
          <el-input v-model.trim="editForm.performance_pay"></el-input>
        </el-form-item>
        <el-form-item label="纳税工资" :label-width="formLabelWidth">
          <el-input v-model.trim="editForm.basic_taxible_salar"></el-input>
        </el-form-item>
        <el-form-item label="代扣税金" :label-width="formLabelWidth">
          <el-input v-model.trim="editForm.tax_deduction"></el-input>
        </el-form-item>
        <el-form-item label="应收工资" :label-width="formLabelWidth">
          <el-input v-model.trim="editForm.salary_receivable"></el-input>
        </el-form-item>
        <el-form-item label="其他扣款" :label-width="formLabelWidth">
          <el-input v-model.trim="editForm.other_deduction"></el-input>
        </el-form-item>
        <el-form-item label="实发工资人民币" :label-width="formLabelWidth">
          <el-input v-model.trim="editForm.final_salary_CNY"></el-input>
        </el-form-item>
        <el-form-item label="实发工资美金" :label-width="formLabelWidth">
          <el-input v-model.trim="editForm.final_salary_USD"></el-input>
        </el-form-item>
        <el-form-item label="批次" prop="pay_roll_date" :label-width="formLabelWidth">
          <el-date-picker
            v-model="editForm.pay_roll_date"
            type="month"
            placeholder="选择批次"
            value-format="yyyyMM">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="处理状态" :label-width="formLabelWidth">
          <el-select v-model="editForm.process_status" placeholder="请选择">
            <el-option
              v-for="item in process_statusList"
              :key="item.id"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
          <el-input v-model.trim="editForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEditUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width=300px center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from "../../../api";
import md5 from "js-md5";
import vue from "vue";
import Vue from "vue";
import qs from 'qs';
import Qs from 'qs'
import config from '../../../../config'
export default {
  data() {
    return {
      // 菜单栏数据
      menusData: [],
      user_Id: "",
      staff_Dept: "",
      download_Month: "",
      Month: "",
      USD : "USD",
      CNY: "CNY",
      query_list: {},
      oldData: [],
      tableData: [

      ],

      // 部门数组
      staff_deptList: [
        
      ],
      // 处理状态
      process_statusList: [
        // {
        //   value: "pending",
        //   name: "录入中"
        // },
        {
          value: "verifying",
          name: "审核中"
        },
        {
          value: "rejected",
          name: "驳回"
        },       
        // {
        //   value: "completed",
        //   name: "已生成"
        // }     
      ],

      // 新增
      dialogTableVisible: false,
      dialogFormVisible: false,
      // 修改用户
      editFormVisible: false,
      // 重置密码
      dialogresetPassword: false,
      dialogSetHotel: false,
      // 删除用户
      delVisible: false,
      editForm: {
        id : "",
        staff_id: "",
        staff_name: "",
        staff_dept: "",
        company: "",
        date_enroll: "",
        staff_position: "",
        // baseSalary: "",
        basic_salary: '',
        CNY_USD: '',
        full_attendance: "",
        actual_attendance: "",
        pay_roll_date: "",
        salary: "",
        exchange_currency: "",
        no_attendance: "",
        overtime_pay: "",
        performance_pay: "",
        basic_taxible_sala: "",
        tax_deduction: "",
        salary_receivable: "",
        other_deduction: "",
        final_salary_CNY: "",
        final_salary_USD: "",
        remark: "",
        process_status: "",
      },
      // 设置角色
      dialogSetRole: false,
      ruleFormAdd: {
        id : "",
        staff_id: "",
        staff_name: "",
        staff_dept: "",
        company: "",
        date_enroll: "",
        staff_position: "",
        basic_salary: "",
        CNY_USD: "",
        full_attendance: "",
        actual_attendance: "",
        pay_roll_date: "",
        salary: "",
        exchange_currency: "",
        no_attendance: "",
        overtime_pay: "",
        performance_pay: "",
        basic_taxible_sala: "",
        tax_deduction: "",
        salary_receivable: "",
        other_deduction: "",
        final_salary_CNY: "",
        final_salary_USD: "",
        remark: "",
        process_status: ""
      },
      multipleSelection: [],
      multipleSelectionHotel: [],
      formLabelWidth: "110px",
      // 删除用户
      deleteUsreList: "",
      // 分页
      currentPage: 1,
      total: 0,
      pageSize: 2,
      page:null,
    };
  },
  created() {
    this.loadingUserData()
  },
  mounted() {
    this.init();
    
  },
  methods: {
    // 导入表格
    importExcel(files) {
      console.log(event.currentTarget.files[0]);
    },
    // 获取数据
    init() {
      // console.log(this.$store.state.menus)
      // console.log(this.tableData)
      // this.total = this.tableData.length;
    },
    // 导出表格
    download() {
      var dd = {
        'TOKEN': this.$store.state.TOKEN,
        'pay_roll_date' : this.download_Month,
      };
      var headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      api.request("post","/payRollExcel",null,qs.stringify(dd),headers).then(response => {
        if (response.status === 200) {
          var data = response.data.results;
          if (data.status === '200') {
            let url = config.serverURI + '/payRollExcel' + '?filename=' + data.file;
            console.log(url);
            window.open(url);
            this.$message("生成表格成功")
          } else if (data.status === 403) {
            this.$message(data.message)
          }
        }               
      })
      .catch(error => {
        console.log(error);
      });
    },

    // 页面刷新获取数据
    loadingUserData() {
      this.staff_deptList = this.$store.state.company_dept  
      var params={
          TOKEN: this.$store.state.TOKEN
      };
      var headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      api
        .request("get", "/api.json", params,null, headers)
        .then(response => {
          // console.log(response)
          if (response.status === 200) {
            var data = response.data;
            console.log(data)
            if (data.results.status === 200) {
              var dd = data.results.result;
              this.tableData = dd;
              this.oldData = dd;
              this.total = data.count
            } else if (data.results.status === 403) {
              this.$message(data.results.message);
            }
          }
        })
        .catch(error => {
          console.log(error);
      });
    },   
    // 搜索用户
    userChange() {
    },
    searchUser() {
      if (this.Month === "" && this.user_Id === "" && this.staff_Dept === "") {
        this.$message("请填入搜索条件，进行搜索");
      } else {

          Vue.set(this.query_list,"TOKEN",this.$store.state.TOKEN)                
          Vue.set(this.query_list,"pay_roll_date",this.Month)                
          Vue.set(this.query_list,"staff_id",this.user_Id)                
          Vue.set(this.query_list,"staff_dept",this.staff_Dept)                
          if (this.Month === ""){
            Vue.delete(this.query_list,"pay_roll_date")                
          }
          if (this.user_Id === "") {
            Vue.delete(this.query_list,"staff_id")
          } 
          if (this.staff_Dept === "") {
            Vue.delete(this.query_list,"staff_dept")
          }
          if (this.page){
            this.currentPage = 1,
            Vue.delete(this.query_list,"page")
          }
          console.log(this.query_list)
          this.searchUserJiekou(); 
      }
      // this.searchUserJiekou(); 

    },
    searchUserJiekou() {
      var params= this.query_list
      var headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      api
        .request("get", "/api.json",params,null, headers)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            this.total = response.data.count;
            var data = response.data.results;
            console.log(data)
            if (data.message === "success") {
              var dd = data.result;
              this.tableData = dd;
              this.oldData =dd;
              console.log(this.tableData);
            } else if (data.status === 403){
              this.$message(data.message);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    reset_serach() {
      this.user_Id = "",
      this.Month = "",
      this.staff_Dept = "",
      this.query_list = {"TOKEN":this.$store.state.TOKEN},
      this.loadingUserData()
    },   
    // 修改用户
    editUser(index, row) {
      this.idx = index;
      const item = this.tableData[index];
      this.editForm = {
        id: item.id,
        staff_id: item.staff_id,
        company: item.company,
        staff_dept: item.staff_dept,
        staff_name: item.staff_name,
        date_enroll: item.date_enroll,
        staff_position: item.staff_position, 
        CNY_USD: item.CNY_USD,
        basic_salary: item.basic_salary,
        full_attendance: item.full_attendance,
        actual_attendance:item.actual_attendance,
        pay_roll_date:item.pay_roll_date,
        salary: item.salary,
        exchange_currency: item.exchange_currency,
        no_attendance: item.no_attendance,
        overtime_pay: item.overtime_pay,
        performance_pay: item.performance_pay,
        basic_taxible_sala: item.basic_taxible_sala,
        tax_deduction: item.tax_deduction,
        salary_receivable: item.salary_receivable,
        other_deduction: item.other_deduction,
        final_salary_CNY: item.final_salary_CNY,
        final_salary_USD: item.final_salary_USD,
        remark: item.remark,
        process_status: item.process_status,
        remark: item.remark
      };
      this.editFormVisible = true;
    },
    saveEditUser() {
      // console.log(this.editForm.baseSalary)
      // this.editForm.baseSalary = this.editForm.CNY_USD === '1' ? '$'+ this.editForm.basic_salary : '￥'+ this.editForm.basic_salary
      // console.log(this.editForm.baseSalary)
      var data = {
        id: this.editForm.id,
        staff_id: this.editForm.staff_id,
        company: this.editForm.company,
        staff_dept: this.editForm.staff_dept,
        staff_name: this.editForm.staff_name,
        date_enroll: this.editForm.date_enroll,
        staff_position: this.editForm.staff_position,
        CNY_USD: this.editForm.CNY_USD,
        basic_salary: this.editForm.basic_salary,
        full_attendance: this.editForm.full_attendance,
        actual_attendance: this.editForm.actual_attendance,
        pay_roll_date:this.editForm.pay_roll_date,
        salary: this.editForm.salary,
        exchange_currency: this.editForm.exchange_currency,
        no_attendance: this.editForm.no_attendance,
        overtime_pay: this.editForm.overtime_pay,
        performance_pay: this.editForm.performance_pay,
        basic_taxible_sala: this.editForm.basic_taxible_sala,
        tax_deduction: this.editForm.tax_deduction,
        salary_receivable: this.editForm.salary_receivable,
        other_deduction: this.editForm.other_deduction,
        final_salary_CNY: this.editForm.final_salary_CNY,
        final_salary_USD: this.editForm.final_salary_USD,         
        remark: this.editForm.remark,
        process_status:this.editForm.process_status,
        TOKEN: this.$store.state.TOKEN,  
      };
      console.log(data);
      var headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      api
        .request("put", "/api.json",null,qs.stringify(data), headers)
        .then(response => {
          console.log(response);
          if (response.status === 201) {
            var dt = response.data.results;
            // console.log(data)
            if (dt.message === "success") {
              var dd = dt.result;
              this.tableData = dd;
              console.log(this.tableData);
              this.editFormVisible = false;
              this.$message('修改成功');
              this.loadingUserData();
              
            } else if (dt.status === 400){
              this.$message(dt.message)
            } else if (dt.status === 403) {
              this.$message("认证失败，请重新登录")
            }
              
          }
        })
        .catch(error => {
          console.log(error);
          // this.message(error)
          this.editFormVisible = false;
          this.loadingUserData()          
        });    
    },
    // 添加用户 接口调用
    addUser() {
      console.log(this.ruleFormAdd.company);
      if (this.ruleFormAdd.staff_dept === "") {
        this.$message.error("部门为必填项，请填写之后再保存！");
        return;
      } else if (this.ruleFormAdd.staff_name === "") {
        this.$message.error("姓名为必填项，请填写之后再保存！");
        return;
      } else if (this.ruleFormAdd.staff_id === "") {
        this.$message.error("工号为必填项，请填写之后再保存！");
        return;
      } else if (this.ruleFormAdd.full_attendance === "") {
        this.$message.error("全勤为必填项，请填写之后再保存！");
        return;
      } else if (this.ruleFormAdd.pay_roll_date === "") {
        this.$message.error("批次为必填项，请填写之后再保存！");
        return;
      } else {
        console.log(this.ruleFormAdd);
        this.ruleFormAdd.company = this.$store.state.user_company;
        this.ruleFormAdd.TOKEN = this.$store.state.TOKEN;

        var dd = this.ruleFormAdd;
        var headers = {
        "Content-Type": "application/x-www-form-urlencoded"
        };
        api.request("post","/api.json",null,qs.stringify(dd),headers).then(response => {
          if (response.status === 201) {
            var data = response.data.results;
            if (data.status === 200) {
              console.log(data.result);
              this.$message("增加考勤记录成功")
            } else if (data.status === 400 ){
              this.$message.error(data.message.staff_dept)
            } else if (data.status === 403){
              this.$message.error("权限认证失败")
            }
          }
        this.ruleFormAdd = {};
        this.dialogFormVisible = false;
        this.loadingUserData();         
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
    // 设置角色
    setRoles(row) {
      // console.log(row)
      this.userNo = row.userNo;
      var data = {
        UserNo: this.userNo
      };
      console.log(data);
      this.roleList = data.roleList;
      // console.log(this.roleList)
      this.dialogSetRole = true;
    },
    // 取消设置角色
    roleSettingsCanceled() {
      this.$refs.multipleTable.clearSelection();
      this.dialogSetRole = false;
    },
    show() {
      vue.nextTick(_ => {
        // console.log(this.$refs.multipleTable)
        for (var i = 0; i < this.roleList.length; i++) {
          // console.log(i + '+' + this.roleList[i].isCheck)
          if (this.roleList[i].isCheck === true) {
            // console.log(this.roleList[i])
            this.$refs.multipleTable.toggleRowSelection(this.roleList[i], true);
          } else {
            this.$refs.multipleTable.toggleRowSelection(this.roleList[0], true);
          }
        }
      });
    },
    setRole() {
      // console.log(this.multipleSelection)
      var arr = [];
      this.multipleSelection.forEach(function(item) {
        arr.push(item.roleId);
      });
      var data = {
        UserNo: this.userNo,
        RoleList: arr
      };
      console.log(data);

      this.$message("角色分配成功");
      this.dialogSetRole = false;
    },
    // 删除
    // handleDelete(row) {
    //   this.dialogresetPassword = true;
    //   this.resetPasswordForm.userNo = row.userNo;
    // },
    // 保存重置密码
    editResetPassword() {
      if (this.resetPasswordForm.newPassword === "") {
        this.$message("请填写新密码");
      } else if (this.resetPasswordForm.comformPassword1 === "") {
        this.$message("请填写确认密码");
      } else if (
        this.resetPasswordForm.newPassword !==
        this.resetPasswordForm.comformPassword1
      ) {
        this.$message("两次密码填写不一致");
        this.resetPasswordForm.comformPassword1 = "";
      } else {
        this.savePassword();
      }
    },
    savePassword() {
      var data = {
        UserNo: this.resetPasswordForm.userNo,
        Password: md5(this.resetPasswordForm.newPassword)
      };
      console.log(data);
      this.resetPasswordForm = {};
      this.dialogresetPassword = false;
      this.$message("密码修改成功");
    },
    // 删除
    handleDelete(index, row) {
      this.idx = index;
      this.delVisible = true;
      this.deleteUsreList = row;
    },
    // 确定删除
    deleteRow() {
      var data = {
        id: this.deleteUsreList.id,
        TOKEN: this.$store.state.TOKEN
      };
      console.log(data);
      var headers = {
        "Content-Type": "application/x-www-form-urlencoded"
        };
      api.request("delete","/api.json",null,qs.stringify(data),headers).then(response => {
        if (response.status === 204) {
          var dt = response.data;
          if (dt.status == 200) {
            console.log(dt.data);
            this.$message.success("删除成功");
            this.loadingUserData()
          } else if (dt.status == 400 ){
            this.$message.error(dt.message)
          } else if (dt.status == 403){
            this.$message.error("权限认证失败") 
          }
        }
      })
      .catch(error => {
        console.log(error);
      })
      this.delVisible = false;
      this.loadingUserData()
    },
    // 分页
    // 分页导航
    handleCurrentChange(val) {
      console.log(`跳转到第 ${val} 页`);
      this.cur_page = val;
      if (val === 1) {
        this.page = null;
      } else {
        this.page = val;
      }
      if (this.Month === "" && this.user_Id === "" && this.staff_Dept === "") {
        Vue.set(this.query_list,"page",this.page);
        Vue.set(this.query_list,"TOKEN",this.$store.state.TOKEN)                
        this.gengxin(); 
      } else {
          Vue.set(this.query_list,"TOKEN",this.$store.state.TOKEN)                
          Vue.set(this.query_list,"pay_roll_date",this.Month)                
          Vue.set(this.query_list,"staff_id",this.user_Id)                
          Vue.set(this.query_list,"staff_dept",this.staff_Dept)  
          Vue.set(this.query_list,"page",this.page)                 
          if (this.Month === ""){
            Vue.delete(this.query_list,"pay_roll_date")                
          }
          if (this.user_Id === "") {
            Vue.delete(this.query_list,"staff_id")
          } 
          if (this.staff_Dept === "") {
            Vue.delete(this.query_list,"staff_dept")
          }
          if (this.page === null){
            Vue.delete(this.query_list,"page")
          } 
          console.log(this.query_list);
          this.gengxin(); 
      }     
    },
    // handleSizeChange(val) {
    //   this.pageSize = val;
    // }

    gengxin() {
      var array = [];  
      var params= this.query_list;
      var headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      api
        .request("get", "/api.json", params,null, headers)
        .then(response => {
          // console.log(response)
          if (response.status === 200) {
            var data = response.data;
            console.log(data)
            if (data.results.status === 200) {
              var dd = data.results.result;
              this.tableData = dd;
              this.oldData = dd;
              this.total = data.count
            } else if (data.results.status === 403){
              this.$message(data.results.message);
            }
            array = this.tableData;
            return array
          }
        })
        .catch(error => {
          console.log(error);
      });
    }
  },
};
//   computed: {
//     data() {
//       var array = [];
//       var startNum = 0;
//       var endNum = 0;
//       if (this.tableData.length > 0) {
//         this.total = this.tableData.length;
//       } else {
//         this.total = 0;
//       }
//       startNum = (this.currentPage - 1) * this.pageSize;
//       if (this.currentPage * this.pageSize < this.total) {
//         endNum = this.currentPage * this.pageSize;
//       } else {
//         endNum = this.total;
//       }
//       array = this.tableData.slice(startNum, endNum);
//       return array;
//     }
//   }
// };
</script>
<style lang="less">
.staffSet {
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-table__expanded-cell[class*="cell"] {
    padding: 0;
  }
  .el-table td,
  .el-table th {
    text-align: center;
  }
  .handle-box {
    margin-bottom: 10px;
    text-align: left;
  }
  .el-select {
    width: 100%;
  }
  .el-dialog {
    width: 800px;
    // height: 800px ;
  }
  // 表格数据导入
  .importExcel {
    border: none;
    // opacity: 0;
  }
  .importExcel[type="file"] {
    color: transparent;
    width: 2px;
  }

  // 新修改
  .headerTitle {
    height: 40px;
    line-height: 40px;
    margin-top: -10px;
    margin-right: 20px;
    display: inline-block;
    color: rgb(96, 98, 102);
    font-size: 13px;
    .headerIcon {
      font-size: 14px;
    }
  }
  .el-table--small td {
    padding: 3px 0;
  }
  /* 搜索框 */
  .staffSerchList,
  .staffSerchBtn {
    display: inline-block;
  }
  .staffSerchList {
    width: 88%;
    font-size: 14px;
    .staffSerchList1 {
      display: inline-block;
    }
  }
  .staffSerchBtn {
    margin-left: 10px;
    text-align: right;
  }
}
@media (min-width: 768px) {
  .staffSet .staffSerchList {
    width: 81%;
  }
} /*>=768的设备*/

@media (min-width: 980px) {
  .staffSet .staffSerchList {
    width: 83%;
  }
} /*>=980的设备*/

@media (min-width: 1024px) {
  .staffSet .staffSerchList {
    width: 84%;
  }
} /*>=1024的设备*/

@media (min-width: 1100px) {
  .staffSet .staffSerchList {
    width: 85%;
  }
} /*>=1100的设备*/
@media (min-width: 1280px) {
  .staffSet .staffSerchList {
    width: 88%;
  }
} /*>=1280的设备*/
</style>
