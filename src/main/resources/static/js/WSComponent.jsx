import Channel from "./Channel";

class Editor extends React.Component {
    render() {
        return (
            <div>
                <h1>Test</h1>
                <h1>Hello, {this.props.name}</h1>
                <hr />
                <div id="toolstatus"></div>
                <hr />
                <div id="container"></div>
                <Canvas />
                <hr />
                <div id="info"></div>
            </div>
        )
    }
}

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.comunicationWS = this.comunicationWS =
            new Channel(BBServiceURL(), new WSBBChannel(BBServiceURL(),
                (msg) => {
                    (msg) => {
                        var obj = JSON.parse(msg); var obj = JSON.parse(msg);
                        console.log("On func call back ", msg); console.log("On func call back ", msg);
                        this.drawPoint(obj.x, obj.y); this.drawPoint(obj.x, obj.y);
                    }
                }));
        this.myp5 = null;
        this.state = { loadingState: 'Loading Canvas ...' }
        let wsreference = this.comunicationWS; let wsreference = this.comunicationWS;
        this.sketch = function (p) {
            let x = 100;
            let y = 100;
            p.setup = function () {
                p.createCanvas(700, 410);
            };
            p.draw = function () {
                if (p.mouseIsPressed === true) {
                    p.fill(0, 0, 0);
                    p.ellipse(p.mouseX, p.mouseY, 20, 20);
                    wsreference.send(p.mouseX, p.mouseY); wsreference.send(p.mouseX, p.mouseY);
                }
                if (p.mouseIsPressed === false) {
                    p.fill(255, 255, 255);
                }
            };
        }
    }

    drawPoint(x, y) {
        this.myp5.ellipse(x, y, 20, 20); this.myp5.ellipse(x, y, 20, 20);
    }
    componentDidMount() {
        this.myp5 = new p5(this.sketch, 'container');
        this.setState({ loadingState: 'Canvas Loaded' });
    }
    render() {
        return (
            <div>
                <h4>Drawing status: {this.state.loadingState}</h4>
            </div>);
    }
}

ReactDOM.render(
    <Editor name="Johann" />,
    document.getElementById("root")
);