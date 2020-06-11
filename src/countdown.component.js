import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import './countdown.styles.scss';
import { FaPlayCircle, FaRegPauseCircle } from 'react-icons/fa';
class Countdown extends React.Component {
    state = { speed: 1, currentTime: null, countDown: '', running: false, invalid: true, time: '00:00', currrentTime: null, started: false, interval: null, ended: false };
    changeHandler = (event) => {
        let value = event.target.value;
        let valid = false;
        let time;
        if (!value || value === '' || isNaN(value) || value < 0) {
            valid = true;
            time = '00:00';
        } else {
            time = this.calculateTime(value * 60);
        }

        this.setState({ countDown: event.target.value, invalid: valid, time: time, currentTime: value * 60 });
    }

    calculateTime = (time) => {
        let min_calc = Math.floor(time / 60);
        let sec_calc = Math.floor(time % 60);
        let min = (min_calc >= 10) ? min_calc : '0' + min_calc;
        let sec = (sec_calc >= 10) ? sec_calc : '0' + sec_calc;
        return min + ':' + sec;
    }

    start = (event) => {
        if (event) {
            event.preventDefault();
        }
        if (this.state.running) {
            window.clearInterval(this.state.interval);
            this.setState({ running: false });
        } else {
            let ms = 1000 / this.state.speed;
            let interval = setInterval(() => {
                let count = this.state.currentTime - 1;
                if (count <= 0) {
                    window.clearInterval(this.state.interval);
                    this.setState({ ended: true, started: true, running: false, time: '00:00', currentTime: this.state.countDown * 60 });
                } else {
                    let time = this.calculateTime(count);
                    this.setState({ ended: false, started: true, running: true, time: time, currentTime: count });
                }
            }, ms);
            this.setState({ started: true, running: true, interval: interval });
        }
    }

    changeSpeed = (speed) => {
        if (!this.state.running) {
            this.setState({ speed: speed });
        } else {
            window.clearInterval(this.state.interval);
            let ms = 1000 / speed;
            let interval = setInterval(() => {
                let count = this.state.currentTime - 1;
                if (count <= 0) {
                    window.clearInterval(this.state.interval);
                    this.setState({ started: false, running: false, time: '00:00', currentTime: count });
                } else {
                    let time = this.calculateTime(count);
                    this.setState({ started: true, running: true, time: time, currentTime: count });
                }
            }, ms);
            this.setState({ started: true, running: true, interval: interval, speed: speed });
        }
    }

    reset = () => {
        window.clearInterval(this.state.interval);
        this.setState({ started: false, running: false, interval: null, countDown: '', time: '00:00', ended: false, speed: 1 });
    }

    getClassNames = () => {
        let classes = '';
        if (this.state.running) {
            if (this.state.currentTime <= 20) {
                classes = 'color-red'
            }
            if (this.state.currentTime <= 10) {
                classes += ' blink'
            }
        } else if (this.state.ended) {
            classes = 'color-red';
        }
        return classes;
    }

    render() {
        return (<div className="countdown-panel">
            <Card>
                <Card.Title>
                    <div className="row">
                        <div className="col-4"> <span>Countdown: </span></div>
                        <div className="col-4"> <input value={this.state.countDown} onChange={this.changeHandler} type="number" placeholder="Min" min="1" disabled={this.state.started} />
                            {this.state.invalid && this.state.countDown != '' &&
                                <div><span className="error" >Please enter a valid positive number</span></div>
                            }
                        </div>
                        <div className="col-4">
                            {!this.state.started &&
                                <Button color="primary" disabled={this.state.invalid || this.state.started} onClick={this.start} >Start</Button>
                            }
                            {this.state.started &&
                                <Button color="primary" onClick={this.reset} >Reset</Button>
                            }
                        </div>
                    </div>
                </Card.Title>
                <Card.Body><div className="countdown-time">
                    {this.state.currentTime < ((this.state.countDown * 60) / 2) &&
                        <div className="floating-text-top">
                            <div>More than halfway there!</div>
                        </div>
                    }
                    {this.state.ended &&
                        <div className="floating-text-top">
                            <div>Time's up!</div>
                        </div>
                    }
                    <span className={this.getClassNames()}>{this.state.time}</span>
                    {this.state.started && !this.state.ended &&
                        < Button className="clear-button" variant="link" onClick={this.start}>
                            {!this.state.running &&
                                <FaPlayCircle />
                            }
                            {this.state.running &&
                                <FaRegPauseCircle />
                            }
                        </Button>
                    }
                </div></Card.Body>
                <div className="speed-buttons">
                    <Button variant="outline-secondary" onClick={() => this.changeSpeed(1)} active={this.state.speed == 1} >1X</Button>
                    <Button variant="outline-secondary" onClick={() => this.changeSpeed(1.5)} active={this.state.speed == 1.5} >1.5X</Button>
                    <Button variant="outline-secondary" onClick={() => this.changeSpeed(2)} active={this.state.speed == 2} >2X</Button>
                </div>
            </Card>
        </div >);
    }
}

export default Countdown;