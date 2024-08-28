
export default function Shop() {
    let left = 100
    let showShop = false
    let shopClick = function() { 
        let shopTab = document.getElementById('shopTab')

        if (shopTab.style.left === 70) {
            showShop = true
        }

        let leftIndicator = 2.5
        if (showShop === false) {
            let shopTabInterval = setInterval(() => {
                left = left - leftIndicator
                shopTab.style.left = left + 'vw'
                if (left === 85) {
                    leftIndicator = 4
                }
                if (left <= 70) {
                    showShop = true
                    clearInterval(shopTabInterval)
                }
            }, 15)
        }
        else {
            let shopTabIntervalClose = setInterval(() => {
                left = left + 2.5
                shopTab.style.left = left + 'vw'
                if (left === 85) {
                    leftIndicator = 4
                }
                if (left >= 100) {
                    showShop = false
                    clearInterval(shopTabIntervalClose)
                }
            }, 15)
        }
        

    }
    return (
        <button className="shopButton" onClick = {shopClick}>Shop</button>
    )
}
