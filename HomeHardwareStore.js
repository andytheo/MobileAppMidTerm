const Order = require("./Order");

let broomAndDustpan = 25;
let snowShovel = 22;
let garbageContainer = 17;
let lightbulb = 5;
let householdCleaner = 22;
let furnaceFilter = 69;
let catScreen = 20;

let simonizeCarCloth = 16;
let geekyHeadlamp = 38;
let earbuds = 5;
let kettleDescaler = 15;

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  PRODUCT: Symbol("product"),
  PRODUCT2: Symbol("product"),
  UPSELL: Symbol("upsell"),
});

module.exports = class LockDownEssentials extends Order {
  constructor(sNumber, sUrl) {
    super(sNumber, sUrl);
    this.stateCur = OrderState.WELCOMING;
    this.sName = "";
    this.sProduct = "";
    this.sProduct2 = "";
    this.upsell = "";
    this.totalPrice = 0;
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.PRODUCT;
        aReturn.push("Welcome to Andrew's Home Hardware.");
        aReturn.push(`For a list of what we sell tap:`);
        aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
        aReturn.push(`What would you like to buy?
        Enter a name or number
            1. Broom and Dustbin
            2. Snow shovel
            3. Garbage container
            4. Lightbulb
            5. Household cleaner
            6. Furnace filter
            7. Cat screen`);
        aReturn.push("What would you like to buy?");
        break;
      case OrderState.PRODUCT:
        if (sInput.toLowerCase() == "broom and dustbin" || sInput == 1) {
          this.totalPrice += broomAndDustpan;
        } else if (sInput.toLowerCase() == "snow shovel" || sInput == 2) {
          this.totalPrice += snowShovel;
        } else if (sInput.toLowerCase() == "garbage container" || sInput == 3) {
          this.totalPrice += garbageContainer;
        } else if (sInput.toLowerCase() == "lightbulb" || sInput == 4) {
          this.totalPrice += lightbulb;
        } else if (sInput.toLowerCase() == "household cleaner" || sInput == 5) {
          this.totalPrice += householdCleaner;
        } else if (sInput.toLowerCase() == "furnace filter" || sInput == 6) {
          this.totalPrice += furnaceFilter;
        } else if (sInput.toLowerCase() == "cat screen" || sInput == 7) {
          this.totalPrice += catScreen;
        } else {
          aReturn.push("Enter correct product name or number");
          break;
        }
        this.sProduct = sInput;
        aReturn.push("Do you want a second product?");
        this.stateCur = OrderState.PRODUCT2;
        break;

      case OrderState.PRODUCT2:
        if (sInput.toLowerCase() != "no") {
          if (sInput.toLowerCase() == "broom and dustbin" || sInput == 1) {
            this.totalPrice += broomAndDustpan;
          } else if (sInput.toLowerCase() == "snow shovel" || sInput == 2) {
            this.totalPrice += snowShovel;
          } else if (
            sInput.toLowerCase() == "garbage container" ||
            sInput == 3
          ) {
            this.totalPrice += garbageContainer;
          } else if (sInput.toLowerCase() == "lightbulb" || sInput == 4) {
            this.totalPrice += lightbulb;
          } else if (
            sInput.toLowerCase() == "household cleaner" ||
            sInput == 5
          ) {
            this.totalPrice += householdCleaner;
          } else if (sInput.toLowerCase() == "furnace filter" || sInput == 6) {
            this.totalPrice += furnaceFilter;
          } else if (sInput.toLowerCase() == "cat screen" || sInput == 7) {
            this.totalPrice += catScreen;
          } else {
            aReturn.push("Enter correct product name or number");
            break;
          }
          this.sProduct2 = sInput;
          aReturn.push("Do you want an upsell product?");
          this.stateCur = OrderState.UPSELL;
          break;
        } else {
          this.sProduct2 = sInput;
          aReturn.push(`Do you want an upsell product?
          If yes, enter a name or number
            Up-sell Items
              1. Simonize car cloth
              2. Geeky headlamp
              3. Ear buds
              4. Kettle descaler`);
          this.stateCur = OrderState.UPSELL;
          break;
        }

      case OrderState.UPSELL:
        this.sUpsell = sInput;
        if (sInput.toLowerCase() != "no") {
          if (sInput.toLowerCase() == "Simonize car cloth" || sInput == 1) {
            this.totalPrice += simonizeCarCloth;
          } else if (sInput.toLowerCase() == "Geeky headlamp" || sInput == 2) {
            this.totalPrice += geekyHeadlamp;
          } else if (sInput.toLowerCase() == "Earbuds" || sInput == 3) {
            this.totalPrice += earbuds;
          } else if (sInput.toLowerCase() == "Kettle descaler" || sInput == 4) {
            this.totalPrice += kettleDescaler;
          } else {
            aReturn.push("Enter correct product name or number");
            break;
          }
        }
        let tax = 1.13;
        let grandTotal = tax * this.totalPrice;
        aReturn.push("Thank you for your order");
        aReturn.push(`Product 1: ${this.sProduct}`);
        if (this.sProduct2) aReturn.push(`Product 2: ${this.sProduct2}`);
        if (this.sUpsell) aReturn.push(`Upsell: ${this.sUpsell}`);
        aReturn.push(
          `Your total comes to $${grandTotal.toFixed(2)} (13% Tax included)`
        );
        aReturn.push(
          `We will text you from 519-222-2222 when your order is ready or if we have questions.`
        );
        this.isDone(true);
        break;
    }
    return aReturn;
  }
  renderForm() {
    // your client id should be kept private
    return `
      <html>

<head>
    <meta content="text/html; charset=UTF-8" http-equiv="content-type">
    <style type="text/css">
        ol {
            margin: 0;
            padding: 0
        }

        table td,
        table th {
            padding: 0
        }

        .c1 {
            border-right-style: solid;
            padding: 5pt 5pt 5pt 5pt;
            border-bottom-color: #000000;
            border-top-width: 1pt;
            border-right-width: 1pt;
            border-left-color: #000000;
            vertical-align: top;
            border-right-color: #000000;
            border-left-width: 1pt;
            border-top-style: solid;
            border-left-style: solid;
            border-bottom-width: 1pt;
            width: 234pt;
            border-top-color: #000000;
            border-bottom-style: solid
        }

        .c8 {
            color: #000000;
            font-weight: 400;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 16pt;
            font-family: "Arial";
            font-style: normal
        }

        .c3 {
            color: #000000;
            font-weight: 700;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 15pt;
            font-family: "Arial";
            font-style: normal
        }

        .c4 {
            color: #000000;
            font-weight: 400;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 11pt;
            font-family: "Arial";
            font-style: normal
        }

        .c9 {
            color: #000000;
            font-weight: 700;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 16pt;
            font-family: "Arial";
            font-style: normal
        }

        .c6 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.15;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        .c0 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.0;
            text-align: left
        }

        .c11 {
            border-spacing: 0;
            border-collapse: collapse;
            margin-right: auto
        }

        .c5 {
            background-color: #ffffff;
            max-width: 468pt;
            padding: 72pt 72pt 72pt 72pt
        }

        .c2 {
            height: 0pt
        }

        .c10 {
            background-color: #efefef
        }

        .c7 {
            height: 11pt
        }

        .title {
            padding-top: 0pt;
            color: #000000;
            font-size: 26pt;
            padding-bottom: 3pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        .subtitle {
            padding-top: 0pt;
            color: #666666;
            font-size: 15pt;
            padding-bottom: 16pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        li {
            color: #000000;
            font-size: 11pt;
            font-family: "Arial"
        }

        p {
            margin: 0;
            color: #000000;
            font-size: 11pt;
            font-family: "Arial"
        }

        h1 {
            padding-top: 20pt;
            color: #000000;
            font-size: 20pt;
            padding-bottom: 6pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h2 {
            padding-top: 18pt;
            color: #000000;
            font-size: 16pt;
            padding-bottom: 6pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h3 {
            padding-top: 16pt;
            color: #434343;
            font-size: 14pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h4 {
            padding-top: 14pt;
            color: #666666;
            font-size: 12pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h5 {
            padding-top: 12pt;
            color: #666666;
            font-size: 11pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h6 {
            padding-top: 12pt;
            color: #666666;
            font-size: 11pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            font-style: italic;
            orphans: 2;
            widows: 2;
            text-align: left
        }
    </style>
</head>

<body class="c5">
    <p class="c6"><span class="c9">Welcome to Andrew&rsquo;s Home Hardware Help Page</span></p>
    <p class="c6 c7"><span class="c8"></span></p>
    <p class="c6"><span class="c4">Phone: 519-222-2222</span></p>
    <p class="c6 c7"><span class="c4"></span></p>
    <p class="c6"><span class="c4">Main products</span></p><a id="t.6628905e674f75392eb8425e5f6f48f7a61e048c"></a><a
        id="t.0"></a>
    <table class="c11">
        <tr class="c2">
            <td class="c1 c10" colspan="1" rowspan="1">
                <p class="c0"><span class="c3">Product</span></p>
            </td>
            <td class="c1 c10" colspan="1" rowspan="1">
                <p class="c0"><span class="c3">Price</span></p>
            </td>
        </tr>
        <tr class="c2">
            <td class="c1" colspan="1" rowspan="1">
                <p class="c0"><span class="c4">Broom and dustbin</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
                <p class="c0"><span class="c4">$25</span></p>
            </td>
        </tr>
        <tr class="c2">
            <td class="c1" colspan="1" rowspan="1">
                <p class="c0"><span class="c4">Snow shovel</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
                <p class="c0"><span class="c4">$22</span></p>
            </td>
        </tr>
        <tr class="c2">
            <td class="c1" colspan="1" rowspan="1">
                <p class="c0"><span class="c4">Garbage container</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
                <p class="c0"><span class="c4">$17</span></p>
            </td>
        </tr>
        <tr class="c2">
            <td class="c1" colspan="1" rowspan="1">
                <p class="c0"><span class="c4">Lightbulb</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
                <p class="c0"><span class="c4">$5</span></p>
            </td>
        </tr>
        <tr class="c2">
            <td class="c1" colspan="1" rowspan="1">
                <p class="c0"><span class="c4">Household cleaner</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
                <p class="c0"><span class="c4">$22</span></p>
            </td>
        </tr>
        <tr class="c2">
            <td class="c1" colspan="1" rowspan="1">
                <p class="c0"><span class="c4">Furnace filter</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
                <p class="c0"><span class="c4">$69</span></p>
            </td>
        </tr>
        <tr class="c2">
            <td class="c1" colspan="1" rowspan="1">
                <p class="c0"><span class="c4">Cat screen</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
                <p class="c0"><span class="c4">$20</span></p>
            </td>
        </tr>
    </table>
    <p class="c6 c7"><span class="c4"></span></p>
    <p class="c6 c7"><span class="c4"></span></p>
    <p class="c6 c7"><span class="c4"></span></p>
    <p class="c6"><span class="c4">Up-sell products</span></p><a id="t.1cb78ec147826770352a57d124cc1d865f4165c9"></a><a
        id="t.1"></a>
    <table class="c11">
        <tr class="c2">
            <td class="c1 c10" colspan="1" rowspan="1">
                <p class="c0"><span class="c3">Product</span></p>
            </td>
            <td class="c1 c10" colspan="1" rowspan="1">
                <p class="c0"><span class="c3">Price</span></p>
            </td>
        </tr>
        <tr class="c2">
            <td class="c1" colspan="1" rowspan="1">
                <p class="c0"><span class="c4">Simonize car cloth</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
                <p class="c0"><span class="c4">$16</span></p>
            </td>
        </tr>
        <tr class="c2">
            <td class="c1" colspan="1" rowspan="1">
                <p class="c0"><span class="c4">Geeky headlamp</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
                <p class="c0"><span class="c4">$38</span></p>
            </td>
        </tr>
        <tr class="c2">
            <td class="c1" colspan="1" rowspan="1">
                <p class="c0"><span class="c4">Ear buds</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
                <p class="c0"><span class="c4">$5</span></p>
            </td>
        </tr>
        <tr class="c2">
            <td class="c1" colspan="1" rowspan="1">
                <p class="c0"><span class="c4">Kettle descaler</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
                <p class="c0"><span class="c4">$15</span></p>
            </td>
        </tr>
    </table>
    <p class="c6 c7"><span class="c4"></span></p>
</body>

</html> `;
  }
};
