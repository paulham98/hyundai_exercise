const do_sth = {
  zeroPadding(num, digit){
    let zero = '';
    for (let i = 0; i < digit; i++){
        zero += 0;
    }
    return (zero + num).slice(-digit);
  },
  install(Vue){
    Vue.prototype.$get_date = () => {
      let cd = new Date();
      return this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2);
    }
    Vue.prototype.$get_no_date = () => {
      let cd = new Date();
      return this.zeroPadding(cd.getFullYear(), 4) + this.zeroPadding(cd.getMonth() + 1, 2) + this.zeroPadding(cd.getDate(), 2);
    }
    Vue.prototype.$get_time = () => {
      let cd = new Date();
      return this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ":" + this.zeroPadding(cd.getSeconds(), 2);
    }
    Vue.prototype.$get_no_time = () => {
      let cd = new Date();
      return this.zeroPadding(cd.getHours(), 2) + this.zeroPadding(cd.getMinutes(), 2) + this.zeroPadding(cd.getSeconds(), 2);
    }
    Vue.prototype.$n_to_0n = (n) => {
      // 10보다 작으면 앞에 0추가해서 01, 02 이렇게 보이게함
      return parseInt(n) < 10
        ? '0' + n
        : n;
    }
    Vue.prototype.$get_api_host = () => {
      window.location.hostname;
      if (process.env.NODE_ENV === 'local'){
        return ' http://'
      } else {
        return ''      // Else, return the original string.
      }
    }
    Vue.prototype.$check_undefined_and_to_fixed = (v, decimal_point) => {
      // 소수점 decimal_point까지 보여줌 undefined가 아닐때
      if (v != undefined && v !== '' && v !== '-' && v !== ' '){
          return v.toFixed(decimal_point)
      }
      return v
    },
    Vue.prototype.$call_api = (url, callback) => {
      fetch(url)
        .then(res => {
          return res.json()
        })
        .then(data => {
          callback(data.data)
      })
    },
    Vue.prototype.$get_first_row_column = line_bg_data => {
      let first_line = line_bg_data[0]
      let first_row = 0
      let first_col = 0
      for (const line_bg of line_bg_data) {
        let start_row = Number(new RegExp('[0-9]{1,2}').exec(line_bg['start_point'])[0])
        let start_col = new RegExp('[A-Z]{1}').exec(line_bg['start_point'])[0].charCodeAt(0) - 65

        if (first_row < start_row) {
          first_row = start_row
          first_col = start_col
          first_line = line_bg
        }

        if (first_col > 6) {
          first_col = 6
        }

        // line_bg에서 start_point를 분리하여
        console.log(`[get_first_row_column]`, first_line, line_bg, first_row, first_col)
      }
      return [first_row, first_col]
    }
  },
}

export default do_sth;
