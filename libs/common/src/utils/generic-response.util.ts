import { Injectable } from "@nestjs/common";
import { GenericResponseDto } from "./dto/generic-response.dto";

export class GenericResponseUtil {

    public static getSuccessResponse(data: any, message: string) {
        var genericResponse = new GenericResponseDto();
        genericResponse.data = data;
        genericResponse.message = message;
        return genericResponse;
    }

    public static getSuccessMessage(message: string) {
        var genericResponse = new GenericResponseDto();
        genericResponse.message = message;
        return genericResponse;
    }
}