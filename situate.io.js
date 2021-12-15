class Controls {
    // funcKeyList format:
    /*
     * {
     *  parent: String,
     *  info: [
     *   {
     *    key: Integer (or "any"),
     *    func: Function
     *   },
     *   ...
     *  ]
     * }
     * 
     */
    constructor(funcKeyList) {
        this.funckeylist = funcKeyList;
        this.parent = funcKeyList.parent;
        this.ele = document.querySelector(this.parent);
    }
    func() {
        return (event) => {
            this.funckeylist.info.forEach((p) => {
                if(event.keyCode == p.key || p.key == "any") {
                    p.func(event.keyCode);
                }
            });
        };
    }
    addEventListener() {
        this.ele.addEventListener("keydown", this.func());
    }
}
