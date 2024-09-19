import dashboardService from "../services/dashboardService.js";

const getDashboard = async(request, response) => {
    console.log("email from request: " + request.email);
    let userDTO;
    try {
        userDTO = await dashboardService.getUserDTO(request.email);
    } catch (error) {
        return response.status(500).json({message: 'Server error'});
    }

    return response.status(200).json(userDTO);
}

export default {
    getDashboard
}