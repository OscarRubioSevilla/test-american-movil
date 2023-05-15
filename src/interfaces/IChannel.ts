export interface IResponse {
    entry:    Entry;
    response: Response;
    status:   string;
    msg:      string;
}

export interface Entry {
    device_id:           string;
    device_category:     string;
    device_model:        string;
    device_type:         string;
    device_so:           string;
    format:              string;
    device_manufacturer: string;
    authpn:              string;
    authpt:              string;
    api_version:         string;
    region:              string;
    HKS:                 string;
    user_id:             string;
    date_from:           string;
    date_to:             string;
    quantity:            string;
}

export interface Response {
    channels: Channel[];
    total:    number;
}

export interface Channel {
    id:                     string;
    number:                 string;
    name:                   string;
    hd:                     boolean;
    image:                  string;
    group_id:               string;
    liveref:                string;
    epg_url:                EpgURL;
    provider_metadata_id:   number;
    provider_metadata_name: ProviderMetadataName;
    group:                  Group;
    events:                 Event[];
}

export enum EpgURL {
    EpgURLTV = "TV",
    Tv = "tv",
    TvChannel = "tv://channel.",
    TvChannel00A0001B001A = "tv://channel.00a0001b001a",
    TvChannel00A0001E0006 = "tv://channel.00a0001e0006",
}

export interface Event {
    channel_id:               string;
    id:                       string;
    name:                     string;
    description:              string;
    talent:                   null | string;
    date_begin:               string;
    date_end:                 string;
    unix_begin:               number;
    unix_end:                 number;
    duration:                 string;
    language:                 Language;
    type:                     string;
    group_id:                 null;
    confirmado:               null;
    id_empleado:              null;
    tms_id:                   null;
    event_alf_id:             string;
    ext_ncont_id:             string;
    ext_nevt_id:              string;
    ext_actors:               null;
    ext_director:             null | string;
    ext_year:                 null | string;
    ext_country:              EXTCountry | null;
    ext_original_name:        string;
    ext_ep_original_name:     null;
    ext_series_id:            null | string;
    ext_season_id:            null | string;
    ext_episode_id:           null | string;
    ext_language:             EXTLanguage;
    ext_serie_short_desc:     null;
    ext_serie_desc:           null;
    image_base_horizontal:    string;
    image_base_vertical:      string;
    image_base_square:        string;
    ext_eventimage_name:      string;
    ext_eventimage_name_base: string;
    ext_catchup:              string;
    ext_startover:            string;
    ext_recordable:           string;
    parental_rating:          string;
    aud_stereo:               string;
    aud_dolby:                string;
    vid_black_and_white:      string;
    dvb_content:              null | string;
    user_content:             null;
    group_rel:                null;
    gmt:                      number;
}

export enum EXTCountry {
    Esp = "ESP",
    Mex = "MEX",
    Usa = "USA",
}

export enum EXTLanguage {
    SPA = "spa",
}

export enum Language {
    Esp = "esp",
}

export interface Group {
    common: Common;
}

export interface Common {
    id:                     string;
    title:                  string;
    title_episode:          null;
    title_uri:              string;
    title_original:         string;
    description:            string;
    description_large:      string;
    short_description:      null;
    image_large:            string;
    image_medium:           string;
    image_small:            string;
    image_still:            null;
    image_background:       string;
    url_imagen_t1:          string;
    url_imagen_t2:          string;
    image_base_horizontal:  string;
    image_base_vertical:    string;
    image_base_square:      string;
    image_clean_horizontal: string;
    image_clean_vertical:   string;
    image_clean_square:     string;
    image_sprites:          string;
    image_frames:           string;
    image_trickplay:        string;
    image_external:         null;
    duration:               null;
    date:                   string;
    year:                   null;
    preview:                string;
    season_number:          null;
    episode_number:         null;
    format_types:           FormatTypes;
    live_enabled:           string;
    live_type:              string;
    live_ref:               string;
    timeshift:              null;
    votes_average:          number;
    rating_code:            RatingCode;
    proveedor_name:         ProveedorName;
    proveedor_code:         ProveedorCode;
    encoder_tecnology:      Nology;
    recorder_technology:    Nology;
    resource_name:          null;
    rollingcreditstime:     null;
    rollingcreditstimedb:   null;
    is_series:              boolean;
    channel_number:         string;
}

export interface Nology {
    id:   null | string;
    desc: Desc | null;
}

export enum Desc {
    HarmonicVos = "HARMONIC_VOS",
    Harmonics = "HARMONICS",
}

export enum FormatTypes {
    Free = "free",
    Susc = "susc",
}

export enum ProveedorCode {
    Amco = "amco",
    Atresplayer = "atresplayer",
    Foxv3 = "foxv3",
    Hbo = "hbo",
    Paramount = "paramount",
}

export enum ProveedorName {
    Amco = "AMCO",
    Atresplayer = "ATRESPLAYER",
    FoxV3 = "FOX V3",
    Hbo = "HBO",
    Paramount = "PARAMOUNT",
}

export enum RatingCode {
    G = "G",
}

export enum ProviderMetadataName {
    Nagra = "NAGRA",
}
