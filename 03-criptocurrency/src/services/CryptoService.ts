import { Ref, ref } from 'vue'
import ICryptoCurrency from '@/interfaces/ICryptoCurrency'
import ICryptoMarket from '@/interfaces/ICryptoMarket'

class CryptoService {
  private cryptosCurrency:Ref<Array<ICryptoCurrency>>
  private cryptoMarket:Ref<ICryptoMarket>

  public constructor() {
    this.cryptosCurrency = ref<Array<ICryptoCurrency>>([])
    this.cryptoMarket = ref<ICryptoMarket>({})
  }

  public getCryptosCurrency():Ref<Array<ICryptoCurrency>> {
    return this.cryptosCurrency
  }

  public getCryptoMarket():Ref<ICryptoMarket> {
    return this.cryptoMarket
  }

  public async fetchCryptosCurrency():Promise<void> {
    try {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
      const response = await fetch(url)
      const result = await response.json()

      const arrayCryptos = result.Data.map( (crypto: { CoinInfo: { Name: string; FullName: string } }) => {
        const object:ICryptoCurrency = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName
        }
        return object
      })
      
      this.cryptosCurrency.value = await arrayCryptos
    } catch (error) {
      console.log(error)
    }
  }

  public async fetchCryptoMarket(currency:string, cryptoCurrency:string):Promise<void> {
    try {
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`
      const response = await fetch(url)
      const result = await response.json()

      this.cryptoMarket.value = await result.DISPLAY[cryptoCurrency][currency]
    } catch (error) {
      console.log(error)
    }
  }
}

export default CryptoService
