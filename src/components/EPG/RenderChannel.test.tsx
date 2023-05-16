import { renderHook } from '@testing-library/react-hooks';
import { render, screen, cleanup } from '@testing-library/react';
import { useChannelStore } from "../../store/useChannelStore";
import { describe, it, expect, afterEach } from 'vitest';
import { RenderChannel } from './RenderChannel';
import { EXTLanguage, Event, Language } from '../../interfaces/IChannel';
import { formatEventTime } from '../../utils/utils';



const EVENT_TEST: Event = {
  "channel_id": "20085",
  "id": "1599316497",
  "name": "Noticiero",
  "description": "Programa de ATEI - Canal 44 UDG.",
  "talent": null,
  "date_begin": "2023/05/12 20:00:00",
  "date_end": "2023/05/12 20:30:00",
  "unix_begin": 1683939600,
  "unix_end": 1683941400,
  "duration": "00:30:00",
  "language": Language.Esp,
  "type": "0",
  "group_id": null,
  "confirmado": null,
  "id_empleado": null,
  "tms_id": null,
  "event_alf_id": "4068d6d0a4ad",
  "ext_ncont_id": "227828273589",
  "ext_nevt_id": "4068d6d0a4ad",
  "ext_actors": null,
  "ext_director": null,
  "ext_year": null,
  "ext_country": null,
  "ext_original_name": "Noticiero Científico Y Cultural Iberoamericano",
  "ext_ep_original_name": null,
  "ext_series_id": "227828252530",
  "ext_season_id": "21",
  "ext_episode_id": "059",
  "ext_language": EXTLanguage.SPA,
  "ext_serie_short_desc": null,
  "ext_serie_desc": null,
  "image_base_horizontal": "",
  "image_base_vertical": "",
  "image_base_square": "",
  "ext_eventimage_name": "",
  "ext_eventimage_name_base": "",
  "ext_catchup": "0",
  "ext_startover": "0",
  "ext_recordable": "0",
  "parental_rating": "+16",
  "aud_stereo": "0",
  "aud_dolby": "0",
  "vid_black_and_white": "0",
  "dvb_content": "Cultural",
  "user_content": null,
  "group_rel": null,
  "gmt": -5
}

describe('Render Channel', () => {
  afterEach(cleanup);
  it('should render nothing if there is no current event', () => {
    const { result } = renderHook(() => useChannelStore((state) => state.current_event));
    expect(result.current).toEqual(expect.objectContaining({}));
  });

  it("should render h3 tag empty", async() => {
    render(<RenderChannel />);
    const title = await screen.findByRole('title')
    expect(title.textContent).toEqual('')
  });

  it("should render correct description", async() => {
    const { result } = renderHook(() => useChannelStore((state) => state.setCurrentEvent));
    result.current(EVENT_TEST);
    render(<RenderChannel />);
    const title = await screen.findByRole('title');
    const event_time = await screen.findByRole('event_time');
    const description = await screen.findByRole('description');
    expect(title.textContent).toEqual(EVENT_TEST.name);
    expect(event_time.textContent).toEqual(formatEventTime({
      date_begin: EVENT_TEST.date_begin,
      date_end: EVENT_TEST.date_end,
      duration: EVENT_TEST.duration
    }));
    expect(description.textContent).toEqual(EVENT_TEST.description);
  });
  
});