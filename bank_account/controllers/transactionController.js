import transactionService from "../services/transactionService.js";

const doTransaction = async(request, response) => {
    const status = await transactionService.doTransaction(request.email,
                                                    request.body.addressee,
                                                    request.body.amount
    );
    if (status === 500) {
        return response.status(status).json({error: 'Server error'});
    }
    return response.status(status).json({message: 'Transaction is successful'});
}

export default {
    doTransaction
}