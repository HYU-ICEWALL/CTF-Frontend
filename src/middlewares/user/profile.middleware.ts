import axios from "axios";
import { config } from "../../config";
import { ProfileDto, UpdateProfileDto } from "../../dto/profile.dto";

export const getOwnProfile = async ():Promise<ProfileDto> => {
  const response = await axios.get<ProfileDto>(`${config.API_URL}/profile`);
  return response.data;
};

export const updateOwnProfile = async (data: UpdateProfileDto) => {
  return axios.put(`${config.API_URL}/profile`, data);
}