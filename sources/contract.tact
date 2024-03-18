import "@stdlib/deploy";

message Add {
    amount: Int as uint32;
}

message Minus {
    amount: Int as uint32;
}

message Multiply {
    amount: Int as uint32;
}

message Divide {
    amount: Int as uint32;
}

contract SampleTactContract with Deployable {

    owner: Address;
    counter: Int as uint32;

    init(owner: Address) {
        self.owner = owner;
        self.counter = 0;
    }

    fun add(v: Int) {
        
        // Check sender
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");
        
        // Update counter
        self.counter = (self.counter + v);
    }
    
    fun minus(v: Int) {
        
        // Check sender
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");
        
        // Update counter
        self.counter = (self.counter - v);
    }

    fun multiply(v: Int) {
        
        // Check sender
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");
        
        // Update counter
        self.counter = (self.counter * v);
    }

    fun divide(v: Int) {
        
        // Check sender
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");
        
        // Update counter
        require(v != 0 , "The divisor cannot be 0");
        self.counter = (self.counter / v);
        
    }

    receive(msg: Add) {
        self.add(msg.amount);
        self.reply("Add".asComment());

    }

    receive(msg: Minus) {
        self.minus(msg.amount);
        self.reply("Minus".asComment());
    }

    receive(msg: Multiply) {
        self.multiply(msg.amount);
        self.reply("Multiply".asComment());

    }

    receive(msg: Divide) {
        self.divide(msg.amount);
        self.reply("Divide".asComment());

    }

    receive("increment") {
        self.add(1);
        self.reply("incremented".asComment());
    }
    
    receive("decrement") {
        self.minus(1);
        self.reply("decremented".asComment());
    }


    get fun counter(): Int {
        return self.counter;
    }

    get fun owner(): Address {
        return self.owner;
    }
}