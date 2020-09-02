import { inject, injectable } from "inversify";
import { HttpService, validator } from "@ionia/libs";
import { UserLoginReq } from "@/models";

@injectable()
export class UserService {
  @inject(HttpService)
  private readonly http!: HttpService;

  @validator(UserLoginReq)
  async login(data: UserLoginReq) {
    console.log("-00", this);
    return await this.http.post("/login", { data });
  }
}
