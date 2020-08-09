import React ,{Component} from 'react';
import BreadcrumbView from "../../../common/BreadcrumbView";
import {Layout} from 'antd';
import BMap from 'BMap';
import {BMAP_HYBRID_MAP, BMAP_NORMAL_MAP} from "../../../common/BMAP_DATA";
import PageMessage from "../../../common/PageMessage";

const {Content} = Layout;
export default class BasicMapView extends Component{
    componentDidMount(){
        console.log(window);
        let map =new BMap.Map("allmap");

        var p1 = new BMap.Point(116.301934,39.977552);
        var p2 = new BMap.Point(116.508328,39.919141);

        var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
        driving.search(p1, p2);

        var local = new BMap.LocalSearch(map, {
            renderOptions:{map: map}
        });
        local.search("停车场");
        map.centerAndZoom(new BMap.Point(116.301934,39.977552), 11);  // 初始化地图,设置中心点坐标和地图级别




        var point = new BMap.Point(116.404, 39.915);
        var marker = new BMap.Marker(point);
        marker.addEventListener("click", function(){
            alert("您点击了标注");
        });
        var content = "中心位置";
        var label = new BMap.Label(content, {       // 创建文本标注
            position: point,                          // 设置标注的地理位置
            //offset: new BMap.Size(10, 20)           // 设置标注的偏移量
        })
        map.addOverlay(label);


        map.addOverlay(marker);
        //添加地图类型控件
        map.addControl(new BMap.MapTypeControl({
            mapTypes:[
                BMAP_HYBRID_MAP,//混合地图
                BMAP_NORMAL_MAP//地图
            ]}));
        map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    }
    render(){
        return <div>
            <BreadcrumbView homeName={"基础"} title={"地图展示"}/>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                <PageMessage text={"初始化地图,设置中心点坐标和地图级别,设置地图显示的城市,开启鼠标滚轮缩放"}/>
                <div style={{width:"100%",height:500}} id={"allmap"}></div>
            </Content>
        </div>
    }
}