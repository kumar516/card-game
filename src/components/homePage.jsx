import React, { useEffect, useState } from "react";
import Container from '@material-ui/core/Container';
import { Grid } from "@material-ui/core";
import "../css/homepage.css";
import { connect } from 'react-redux';
import { AddList } from '../actions/homepageActions';

const Homepage = (props) => {
    const [imgs, setImgs] = useState()
    const [currentImg, setCurrentImg] = useState()
    const [old, setold] = useState(false)
    const [score, setScore] = useState(0)
    useEffect(() => {
        let images = [
            { icon: "fa-baseball-ball", color: "#5b6c7d" },
            { icon: "fa-bug", color: "#30fc03" },
            { icon: "fa-bullseye", color: "#035efc" },
            { icon: "fa-burn", color: "#568f76" },
            { icon: "fa-camera-retro", color: "#c2e36f" },
            { icon: "fa-car", color: "#ccbe8b" },
            { icon: "fa-cat", color: "#967a12" },
            { icon: "fa-chess", color: "#52555c" },
            { icon: "fa-chess-queen", color: "#035efc" },
            { icon: "fa-compact-disc", color: "#915cb8" },
            { icon: "fa-dove", color: "#61593c" },
            { icon: "fa-dragon", color: "#b8749c" },
            { icon: "fa-gopuram", color: "#f0da1a" },
            { icon: "fa-heartbeat", color: "#ed1111" },
            { icon: "fa-igloo", color: "#9da843" },
        ]
        props.AddList(images)
        getLatestList(images)
    }, [])

    const getLatestList = (li) => {
        let newlist = li.slice()
        let array = []
        for (let i = 0; i < 2; i++) {
            newlist.map(res => {
                let id = Math.random();
                array.push({
                    checked: false,
                    icon: res.icon,
                    color: res.color,
                    id: id
                })
            })
        }
        array.sort(function (a, b) { return b.id - a.id });
        setImgs(array.slice());
    }

    const onImage = (id, im) => {
        if (old == false) {
            setold(true)
            setCurrentImg(im)
            let li = [...imgs];
            for (var i = 0; i < li.length; i++) {
                if (li[i].id == id) {
                    li[i].checked = true
                    break;
                }
            }
            setImgs(li)
        }
        else {
            if (im === currentImg) {
                setScore(score + 1)
                let li = [...imgs];
                for (var i = 0; i < li.length; i++) {
                    if (li[i].id == id) {
                        li[i].checked = true
                        break;
                    }
                }
                setImgs(li)
            }
            else {
                let li = [...imgs];
                for (var i = 0; i < li.length; i++) {
                    if (li[i].id == id) {
                        li[i].checked = true
                        break;
                    }
                }
                setImgs(li)
                setTimeout(() => {
                    let ar = [...props.list]
                    let array1 = []
                    for (let i = 0; i < 2; i++) {
                        ar.map(res => {
                            let id = Math.random();
                            array1.push({
                                checked: false,
                                icon: res.icon,
                                color: res.color,
                                id: id
                            })
                        })
                    }
                    array1.sort(function (a, b) { return b.id - a.id });
                    setImgs([...array1]);
                    getLatestList(ar)
                    setScore(0)
                }, 1000)
            }
            setold(false)
            setCurrentImg()
        }
    }

    return (
        <div className="main_container">
            <div className="con">
                <div className="main_heading">CARD MEMORY GAME</div>
                <div className="score">Score: {score}</div>
            </div>
            <Container maxWidth="xl">
                <Grid container spacing={4}>
                    {imgs != undefined && imgs.length && imgs.map(res =>
                        <Grid key={res.id} item xs={4} sm={4} md={3} lg={2} xl={2}>
                            {res.checked === false ?
                                <div onClick={() => onImage(res.id, res.icon)} className="card_container">
                                    <i className="fas fa-question"></i>
                                </div> :
                                <div className="card_container1">
                                    <i style={{ color: res.color, fontSize: "6em" }} className={`fas ${res.icon}`}></i>
                                </div>}
                        </Grid>
                    )}
                </Grid>
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    list: state.list
})

const mapDispatchToProps = dispatch => ({
    AddList: (data) => dispatch(AddList(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);