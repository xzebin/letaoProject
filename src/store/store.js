import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        carArr:JSON.parse(localStorage.getItem("myCar")) || []
    },
    getters:{
        getTotal(state){
            return state.carArr.length;
        },
        getChecked(state){
            let arr = [];
            state.carArr.forEach(e => {
                if(e.checkedBool){
                    arr.push(e.id);
                }
            });
            return arr;
        }
    },
    mutations:{
        addGoodsToCar(state,obj){
            if(state.carArr.length == 0){
                state.carArr.push(obj);
            }else{
                let result = state.carArr.find(e => e.id == obj.id);
                if(result){
                    result.number += obj.number;
                }else{
                    state.carArr.push(obj);
                }
            }
            localStorage.setItem("myCar",JSON.stringify(state.carArr));
        },
        delGoodToCar(state,goodId){
            state.carArr = state.carArr.filter(e => e.id != goodId);
            localStorage.setItem("myCar",JSON.stringify(state.carArr));
        },
        updateGoods(state,item){
            state.carArr.map(e => {
                if(e.id == item.id){
                    e.number = item.number;
                }
            });
            localStorage.setItem("myCar",JSON.stringify(state.carArr));
        },
        updGoodsStatus(state,id){
            state.carArr.map(e => {
                if(e.id == id){
                    e.checkedBool = !e.checkedBool;
                }
            })
            localStorage.setItem("myCar",JSON.stringify(state.carArr));
        },
        checkAllUpdStatus(state,bool){
            state.carArr.map(e => e.checkedBool = bool);
            localStorage.setItem("myCar",JSON.stringify(state.carArr));
        }
    }
});
