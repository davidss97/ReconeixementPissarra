/**
 * Created by andre on 13/10/2017.
 */

function gauss() {
    return 1+((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
}

function sigmoid(x) {
    return 1/(1+Math.exp(-x));
}

function dsigmoid(x) {
    return x*(1-x);
}

function dtanh(x) {
    return 1/Math.pow(Math.cosh(x),2)
}

function muta(x) {
    if (Math.random() < 0.95){
        return x + gauss()*0,5;
    }else{
        return x;
    }
}

function NeuralNetwork(inp, hid, out, ritme=0.1, act=sigmoid){
    this.inp = inp;
    this.hid = hid;
    this.out = out;
    this.wih = Matriu(this.hid, this.inp);
    this.who = Matriu(this.out, this.hid);
    this.wih.aleatoritza();
    this.who.aleatoritza();
    this.ritme = ritme;
    this.act = act;
    if (act == sigmoid){
        this.dact = dsigmoid;
    }else{
        this.dact = dtanh;
    }

    this.muta = function() {
        this.wih = map(this.wih, muta);
        this.who = map(this.who, muta);
    };

    this.educa = function(inputs_ll, targets_ll){
        let inputs = a_matriu(inputs_ll);
        let targets = a_matriu(targets_ll);

        let hid_inputs = prod(this.wih, inputs);
        let hid_outputs = map(hid_inputs, this.act);
        let out_inputs = prod(this.who, hid_outputs);
        let outputs = map(out_inputs, this.act);

        let err = targets - outputs;
        let hid_err = prod(this.who.tr(), err);

        let grad_output = (map(outputs, this.dact)*hid_err)*this.ritme;
        let grad_hidout = map(hid_outputs, this.dact)*hid_err*this.ritme;

        this.who += prod(grad_output, hid_outputs.tr());
        this.wih += prod(grad_hidout, inputs.tr());
    };

    this.previsio = function (inputs_ll) {
        let inputs = a_matriu(inputs_ll);
        let hid_inputs = prod(self.wih, inputs);
        let hid_outputs = map(hid_inputs, self.act);
        let out_inputs = prod(self.who, hid_outputs);
        return map(out_inputs, self.act).allista()
    };

}

for (var i = 0; i <= 100; i++){
    console.log(gauss());
}