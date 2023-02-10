script {
    use injoy_labs::inbond_v2;
    use injoy_labs::op_voting;

    fun withdraw() {
        let founder_addr = @0x6064192b201dc3a7cff0513654610b141e754c9eb1ff22d40622f858c9d912e9;
        let proposal_id = 0;
        let withdrawal_proposal = op_voting::resolve<inbond_v2::WithdrawalProposal>(founder_addr, proposal_id);
        inbond_v2::withdraw<0x1::aptos_coin::AptosCoin>(founder_addr, withdrawal_proposal);
    }
}