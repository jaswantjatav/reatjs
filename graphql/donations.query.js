import { gql } from '@apollo/client';

const DONATIONS_QUERY = gql`
  query {
    ethereum(network: matic) {
      smartContractEvents(
        options: {desc: "block.timestamp.unixtime", limit: 10}
        smartContractEvent: {is: "BuySocialImpact"}
        smartContractAddress: {is: "0x050de9ccaa981dbfb629caece5627c8ac27a4e09"}
      ) {
        block {
          timestamp {
            unixtime
          }
        }
        arguments {
          value
          argument
        }
        transaction {
          hash
        }
      }
    }
  }
`;


export default DONATIONS_QUERY;
