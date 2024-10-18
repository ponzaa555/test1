import axios from "axios"
import { urlencoded } from "express"

const url = "https://script.googleusercontent.com/macros/echo?user_content_key=LPY1Ayj_OeKnDqtAEoaK-QaRy9AF2YKkrJ3L5eWFGCe5Z4sQB4cR2jpMbn8FvOxtsP-kW6aTeufQd4pa38Yxc5l0IrNuiQJaOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHaye9deAUHbfQXfuUXDcuf3BITlhGXk-r-wOzOai4Fd48MLy8TJv-VQ2_aoHmpheeVLQWpv4O7obM8GM8OJhfy2T5nmN8WPxkrI0JnAxiYl7HLYptEU2tb_FdffWqgukPau8Bv6Tqp1LQl1YBgc4rVHQI9Y2b1M38toTF15i3gD5Idf7o_2mcunItGnCZ86rDVau3gOJWy5LVjnCU62GpptuvQ8_MWgdb-7vWaEl1XiDDIQmmDZ3YPqnhwsh4eqPNP0Gw8tETYWB8&lib=M9_yccKOaZVEQaYjEvK1gClQlFAuFWsxN"

const logurl = "https://app-tracking.pockethost.io/api/collections/drone_logs/records?fbclid=IwY2xjawF_M7xleHRuA2FlbQIxMAABHfSmKtw1DbpSsOfN1JN48ebJdI4r9pIyqBbLbNtK75KPSrA85YsoQFA0Pw_aem_rkx0GSUFEfKBN1MIkyaQTg"

export const configs = async(req , res) =>{
    try{
        const id = req.params.id
        const data = (await axios.get(url)).data
        const filterdata = (data.data).filter(item => item.drone_id == id)[0]
        console.log(filterdata)
        var maxspeed = 0
        if(filterdata.max_speed == null){
            maxspeed = 100
        }else if(filterdata.max_speed > 110){
            maxspeed = 110
        }else{
            maxspeed = filterdata.max_speed
        }
        const result = {
            drone_id: filterdata.drone_id,
            drone_name: filterdata.drone_name,
            light: filterdata.light,
            country: filterdata.country,
            max_speed : filterdata.max_speed
        }
        res.status(200).json(result)
    }catch(err){
        console.log(err)
        res.status(500).send('Error fetching data');
    }
}

export const condition = async(req , res ) => 
{
    try{
        const id  = req.params.id
        console.log(id)
        const data = (await axios.get(url)).data
        const filterdata = (data.data).filter(item => item.drone_id == id)[0]
        console.log(filterdata)
        const response = {
            condition:filterdata.condition
        }
        res.status(200).json(response)
    }catch(err){
        res.status(500).send('Error fetching data');
    }
}

export const getlog = async(req , res) =>{
    try{
        var response = [];
        const data = await axios.get(logurl);
        const urldata = await axios.get(url)
        const urldatalist = urldata.data.data
        const items = data.data.items
        for(let i of items){
            var item = {
                drone_id: i.drone_id,
                drone_name: i.drone_name,
                created: i.created,
                country: i.country,
                celsius: i.celsius,
                population: i.population
            }
            response.push(item)
        }
        console.log("response : ",response)
        res.status(200).json(response)
    }catch(err){
        res.status(500).send('Error fetching data');
    }
}