<template>
  <div class="DatePicker-wrap">
    <input
      type="text"
      :class="{ 'datePicker-input': true, disabled: disabled }"
      v-model="DatePickerValue"
      @click="handleInput($event)"
      :disabled="disabled"
    />
    <div class="DatePicker-handle" v-show="showDatePicker">
      <div class="DatePicker-header">
        <i class="iconfont icon-a-zuozuo" @click="preYear"></i>
        <i class="iconfont icon-a-zuo" @click="preMonth"></i>
        <p>{{ titleData }}</p>
        <i class="iconfont icon-a-you" @click="nextMonth"></i>
        <i class="iconfont icon-a-youyou" @click="nextYear"></i>
      </div>
      <div class="DatePicker-body">
        <div class="week-wrap">
          <div class="week-item" v-for="(item, index) in weekData" :key="index">
            {{ item }}
          </div>
        </div>
        <div class="day-wrap">
          <div
            class="day-column"
            v-for="(column, colIndex) in dayData"
            :key="colIndex"
          >
            <div
              class="day-row"
              v-for="(val, valIndex) in column"
              :key="valIndex"
              @click="getDateResult(val, titleData)"
            >
              {{ val.showDate }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    //起始时间
    parentTime: {
      type: Date
    },
    //是否禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      titleData: null,
      weekData: ["一", "二", "三", "四", "五", "六", "日"],
      dayData: [],
      showDatePicker: false,
      parentYear: null,
      parentMonth: null,
      childYear: null,
      childMonth: null,
      DatePickerValue: null
    };
  },
  watch: {
    parentTime(val) {
      this.parentYear = val.getFullYear();
      this.parentMonth = val.getMonth() + 1;
      this.childYear = val.getFullYear();
      this.childMonth = val.getMonth() + 1;
      this.DatePickerValue = `${this.parentTime.getFullYear()}-${this.parentTime.getMonth() +
        1}-${this.parentTime.getDate()}`;
      this.handleFormat(this.childYear, this.childMonth);
    }
  },
  methods: {
    //计算函数
    getMonthData(year, month) {
      let arrDate = [];
      if (!year || !month) {
        var today = new Date();
        year = today.getFullYear();
        month = today.getMonth() + 1;
      }
      //判断当月的一号是周几
      var firstDay = new Date(year, month - 1, 1);
      let firstDayWeekDay = firstDay.getDay();
      //周日是0,改为7
      if (firstDayWeekDay === 0) {
        firstDayWeekDay = 7;
      }
      year = firstDay.getFullYear();
      month = firstDay.getMonth() + 1;

      //判断上一月的最后一天，getDate()方法数值越界的时候会自动的进位或者退位
      let lastDaybeforeMonth = new Date(year, month - 1, 0);
      let lastDaybeforeMonthData = lastDaybeforeMonth.getDate();
      //计算每周开始需要显示几天上月的数据，比如周一，那么显示0天，周二，显示一天，周天，显示六天
      let preMonthDayCount = firstDayWeekDay - 1;

      //当月的最后一天,判断什么时候是下一个月
      let lastDayOfMonth = new Date(year, month, 0);
      let lastDate = lastDayOfMonth.getDate();

      for (let i = 0; i < 7 * 6; i++) {
        //计算当月日期
        let date = i + 1 - preMonthDayCount;
        let showDate = date;
        let thisMonth = month;
        // 处理异常情况
        if (date <= 0) {
          //上一月,这里如果month为0，就会出现问题
          thisMonth = month - 1;
          showDate = lastDaybeforeMonthData + date;
        } else if (date > lastDate) {
          //下一月
          thisMonth = month + 1;
          showDate = showDate - lastDate;
        }
        //修正month
        if (thisMonth === 0) {
          thisMonth = 12;
        }
        if (thisMonth === 13) {
          thisMonth = 1;
        }
        arrDate.push({
          month: thisMonth,
          date: date,
          showDate: showDate
        });
      }
      return {
        year: year,
        month: month,
        arrDate: arrDate
      };
    },
    //处理结果格式
    handleFormat(year, month) {
      let getData = this.getMonthData(year, month);
      let i = 0;
      this.titleData = `${getData.year} 年 ${getData.month} 月`;
      this.dayData = [];
      getData.arrDate.forEach((val, index) => {
        if (index % 7 == 0) {
          i += 7;
          this.dayData.push(getData.arrDate.slice(index, i));
        }
      });
    },
    //选择时间
    getDateResult(val, titleData) {
      this.DatePickerValue = `${titleData.split(" ")[0]}-${val.month}-${
        val.showDate
      }`;
      this.showDatePicker = false;
      this.$emit("getDateResult", this.DatePickerValue);
    },
    handleInput(event) {
      let styles = this.$el.style;
      this.showDatePicker = true;
      styles.setProperty(
        "--DatePickerTop",
        Math.round(event.screenY / 100) * 100 - 50 + "px"
      );
      styles.setProperty("--DatePickerRight", "40px");
    },
    //上一年
    preYear() {
      this.childYear -= 1;
      if (this.childYear >= this.parentYear) {
        this.handleFormat(this.childYear, this.childMonth);
      } else {
        this.childYear += 1;
      }
    },
    //上一月
    preMonth() {
      this.childMonth -= 1;
      if (this.childMonth < 1) {
        this.childYear -= 1;
        this.childMonth = 12;
      }
      if (this.childYear >= this.parentYear) {
        this.handleFormat(this.childYear, this.childMonth);
      } else {
        this.childMonth += 1;
      }
    },
    // 下一月
    nextMonth() {
      this.childMonth += 1;
      if (this.childMonth > 12) {
        this.childYear += 1;
        this.childMonth = 1;
      }
      if (this.childYear <= this.parentYear + 3) {
        this.handleFormat(this.childYear, this.childMonth);
      } else {
        this.childMonth -= 1;
      }
    },
    //下一年
    nextYear() {
      this.childYear += 1;
      if (this.childYear <= this.parentYear + 3) {
        this.handleFormat(this.childYear, this.childMonth);
      } else {
        this.childYear -= 1;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.DatePicker-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  .datePicker-input {
    width: 100%;
    height: 100%;
    text-align: center;
    outline: none;
    border-radius: 5px;
    background: #f5f7fa;
    border: 1px solid #e4e7ed;
  }
  .disabled {
    cursor: not-allowed;
  }
  .DatePicker-handle {
    position: fixed;
    top: var(--DatePickerTop);
    right: var(--DatePickerRight);
    z-index: 100;
    width: 300px;
    height: 270px;
    border-radius: 4px;
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    color: #606266;
    .DatePicker-header {
      display: flex;
      justify-content: space-around;
      width: 100%;
      height: 30px;
      line-height: 30px;
      i {
        font-size: 18px;
        color: #e4e7ed;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .DatePicker-body {
      width: 100%;
      height: 240px;
      .week-wrap {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #e4e7ed;
        font-size: 14px;
        .week-item {
          width: 14.28%;
          text-align: center;
        }
      }
      .day-wrap {
        width: 100%;
        font-size: 12px;
        .day-column {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          height: 30px;
          line-height: 30px;
          .day-row {
            width: 14.28%;
            height: 30px;
            text-align: center;
            cursor: pointer;
            &:hover {
              border-radius: 5px;
              color: #ffffff;
              background: #f57e51;
            }
          }
        }
      }
    }
  }
}
</style>
