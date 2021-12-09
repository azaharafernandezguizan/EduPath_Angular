import { DummyData, DummyUpdateData } from "./dummy";

export class DummyListResponse{
    "status": string | undefined;
    "data": DummyData[] | undefined;
    "message": string | undefined;
}

export class DummyDetailResponse{
    "status": string | undefined;
    "data": DummyData | undefined;
    "message": string | undefined;
}

export class DummyUpdateResponse{
    "status": string | undefined;
    "data": DummyUpdateData | undefined;
    "message": string | undefined;
}

export class DummyDeleteResponse{
    "status": string | undefined;
    "data": string | undefined;
    "message": string | undefined;
}