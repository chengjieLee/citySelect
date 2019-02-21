import React,{Component} from "react"
import axios from "axios";
class CitySelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            province: "",
            city: "",
            county: "",
            countyside:"",
            vilige:"",
            provinces: [],
            cities: [],
            counties: [],
            countysides:[],
            viliges:[]
        }
    }

    handleChangeProvince(e) {
        e.preventDefault()
        const data = this.state.data
        for(var i in data) {
            if(data[i].name === e.target.value) {
                this.setState({
                    cities: data[i].children,
                    counties: [],
                    countysides:[],
                    viliges:[],
                    province:e.target.value +'/'
                })
            }
        }
    }

    handleChangeCity(e) {
        e.preventDefault()
        const cities = this.state.cities
        for(var i in cities) {
            if(cities[i].name === e.target.value) {
                this.setState({
                    counties: cities[i].children,
                    countysides:[],
                    viliges:[],
                    city: e.target.value+'/',
                })
            }
        }
    }

    handleChangeCounty(e) {
        e.preventDefault()
        const counties = this.state.counties
        for(var i in counties){
                if(counties[i].name === e.target.value) {
                    this.setState({
                        countysides: counties[i].children,
                        viliges:[],
                        county:e.target.value+'/'
                    })
                }
        }
    }
    handleChangeCountyside (e){
        e.preventDefault()
        const countysides = this.state.countysides
        for(var i in countysides){
            if(countysides[i].name === e.target.value) {
                if(countysides[i].children){
                    this.setState({
                        viliges: countysides[i].children,
                        countyside:e.target.value+'/'
                    })
                }
                this.setState({
                    viliges: [],
                    countyside:e.target.value
                })
            }
    }
    }
    handleChangeVilige(e){
        e.preventDefault()
        this.setState({
            vilige:e.target.value
        })
    }
    render() {
        return(
            <div>
            {
             this.state.provinces.length!==0
             ?
               <p>
                    <select onChange={this.handleChangeProvince.bind(this)}>
                    <option>省</option>
                        {
                         this.state.provinces.map((i,index) => (
                                            <option value={i} key={index}>{i}</option>
                                        ))
                            }
                    </select>
                    <select onChange = {this.handleChangeCity.bind(this)} >
                        <option>市</option>
                            {
                            this.state.cities.map((i,index) => (
                                                <option value={i.name} key={index}>{i.name}</option>
                                            ))
                                }
                    </select>
                    <select onChange={this.handleChangeCounty.bind(this)}>
                    <option>区</option>
                        {
                         this.state.counties.map((i,index) => (
                                            <option value={i.name} key={index}>{i.name}</option>
                                        ))
                            }
                    </select>
                    <select onChange={this.handleChangeCountyside.bind(this)}>
                        <option>乡</option>
                        {
                            this.state.countysides.map((i,index) => (
                                            <option value={i.name} key={index}>{i.name}</option>
                                        ))
                        }
                    </select>
                    <select onChange={this.handleChangeVilige.bind(this)}>
                        <option>村</option>
                        {
                            this.state.viliges.map((i,index) => (
                                            <option value={i.name} key={index}>{i.name}</option>
                                        ))
                        }
                    </select>
                 </p>   
                 :<p>先稍等，加载一下数据</p>
               }
            <div>{this.state.province + this.state.city + this.state.county + this.state.countyside + this.state.vilige}</div>
            </div>
        )
    }
    componentDidMount() {
        let provinces = [];
        let data = [];
        const url = "https://raw.githubusercontent.com/modood/Administrative-divisions-of-China/master/dist/pcas-code.json";
        const resquest = axios.get(url);
        resquest.then(res => {
            const result = JSON.parse(JSON.stringify(res.data))
            result.forEach(i => {
                provinces.push(i.name)
                data.push(i)
            })
            this.setState({
                data: data,
                provinces: provinces
            })
          
        })
      
    }

}

export default CitySelect