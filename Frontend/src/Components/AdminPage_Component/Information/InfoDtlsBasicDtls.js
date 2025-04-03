import React from "react";

function InfoDtlsBasicDtls(props) {
  var timings = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];
  var options = [{ value: "", label: "" }];
  for (var i = 0; i < timings.length; i++) {
    var obj = { value: timings[i], label: timings[i] };
    options.push(obj);
  }

  let alertboxcontentfunc = (title, body) => {
    props.setalertboxcontent({
      title: title,
      body: body,
    });
  };

  let turfnameChange = (event) => {
    props.setinfo((previousState) => {
      return { ...previousState, turfname: event.target.value };
    });
  };

  let locationChange = (event) => {
    props.setinfo((previousState) => {
      return { ...previousState, location: event.target.value };
    });
  };

  let turfpricewithoutlight = (event) => {
    for (var i = 0; i < event.target.value.length; i++) {
      if (
        !(
          String(event.target.value).charCodeAt(i) >= 48 &&
          String(event.target.value).charCodeAt(i) <= 57
        )
      ) {
        return;
      }
    }
    props.setinfo((previousState) => {
      return { ...previousState, pricewithoutlight: event.target.value };
    });
  };

  let turfpricewithlight = (event) => {
    for (var i = 0; i < event.target.value.length; i++) {
      if (
        !(
          String(event.target.value).charCodeAt(i) >= 48 &&
          String(event.target.value).charCodeAt(i) <= 57
        )
      ) {
        return;
      }
    }
    props.setinfo((previousState) => {
      return { ...previousState, pricewithlight: event.target.value };
    });
  };

  let sttimeChange = (event) => {
    if (props.info.endtimewithoutlight === "") {
      props.setinfo((previousState) => {
        return { ...previousState, starttimewithoutlight: event.target.value };
      });
    } else {
      if (validatedates(props.info.endtimewithoutlight, event.target.value)) {
        props.setinfo((previousState) => {
          return {
            ...previousState,
            starttimewithoutlight: event.target.value,
          };
        });
      } else {
        alertboxcontentfunc(
          "ADMIN - INFORMATION",
          "End time should be greater than Start time"
        );
        document.getElementById("alertboxhit").click();
      }
    }
  };

  let endtimeChange = (event) => {
    if (props.info.starttimewithoutlight === "") {
      props.setinfo((previousState) => {
        return { ...previousState, endtimewithoutlight: event.target.value };
      });
    } else {
      if (validatedates(event.target.value, props.info.starttimewithoutlight)) {
        props.setinfo((previousState) => {
          return { ...previousState, endtimewithoutlight: event.target.value };
        });
      } else {
        alertboxcontentfunc(
          "ADMIN - INFORMATION",
          "End time should be greater than Start time"
        );
        document.getElementById("alertboxhit").click();
      }
    }
  };

  let validatedates = (val1, val2) => {
    if (timings.indexOf(val1) > timings.indexOf(val2)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
      {/* Turf Name */}
      <div className="flex flex-col">
        <label htmlFor="turfname" className="text-gray-700 font-semibold">
          Turf Name:
        </label>
        <input
          type="text"
          id="turfname"
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          value={props.info.turfname}
          onChange={turfnameChange}
        />
      </div>

      {/* Turf Location */}
      <div className="flex flex-col">
        <label htmlFor="turfloc" className="text-gray-700 font-semibold">
          Turf Location:
        </label>
        <input
          type="text"
          id="turfloc"
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          value={props.info.location}
          onChange={locationChange}
        />
      </div>

      {/* Turf Price (Without Lights) */}
      <div className="flex flex-col">
        <label htmlFor="tpwol" className="text-gray-700 font-semibold">
          Turf Price (Without Lights):
        </label>
        <input
          type="text"
          id="tpwol"
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          value={props.info.pricewithoutlight}
          onChange={turfpricewithoutlight}
        />
      </div>

      {/* Turf Price (With Lights) */}
      <div className="flex flex-col">
        <label htmlFor="tpwl" className="text-gray-700 font-semibold">
          Turf Price (With Lights):
        </label>
        <input
          type="text"
          id="tpwl"
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          value={props.info.pricewithlight}
          onChange={turfpricewithlight}
        />
      </div>

      {/* Turf Timing (Without Lights) */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">
          Turf Timing (Without Lights):
        </label>
        <div className="flex items-center space-x-2 mt-1">
          <select
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 w-1/3"
            value={props.info.starttimewithoutlight}
            onChange={sttimeChange}
          >
            {options.map((option, i) => (
              <option value={option.value} key={i}>
                {option.label}
              </option>
            ))}
          </select>
          <span>To</span>
          <select
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 w-1/3"
            value={props.info.endtimewithoutlight}
            onChange={endtimeChange}
          >
            {options.map((option, i) => (
              <option value={option.value} key={i}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
export default InfoDtlsBasicDtls;
