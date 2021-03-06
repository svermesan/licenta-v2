﻿//Shared script file in application

$(document).ready(function () {
    PassDataToFavouritesConfirmationModal();

    $('.favourites-widget').on('click', ToggleFavouriteAction);

    $("#btnRemoveFromFavourites").on('click', RemoveFromFavourites);

    $("#sortOptions").on('change', OnChangeSorting);
});

function ShowLoader() {
    $("#preloader").fadeIn();
}

function HideLoader() {
    $("#preloader").fadeOut();
}

function OnChangeSorting() {
    ShowLoader();

    var sortOptions = $("#sortOptions option:selected").val();
    $.ajax({
        type: "GET",
        url: "/Property/Index",
        data: { sortOptions: sortOptions },
        dataType: "html",
        success: function (result) {
            $("body").html(result);
            HideLoader();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

function PassDataToFavouritesConfirmationModal() {
    var ATTRIBUTES = ['myvalue'];

    $('[data-toggle="modal"]').on('click', function (e) {
        var $target = $(e.target);
        // modal targeted by the button
        var modalSelector = $target.data('target');

        // iterate over each possible data-* attribute
        ATTRIBUTES.forEach(function (attributeName) {
            var $modalAttribute = $(modalSelector + ' #modal-' + attributeName);
            var dataValue = $target.data(attributeName);
            $modalAttribute.val(dataValue || '');
        });
    });
}

function ToggleFavouriteAction() {
    var propertyId = $('#modelId', this);
    var isFavourite = $("#isFavourite", this);
    var heartIcon = $(".fa-heart", this);

    ShowLoader();

    var id = propertyId.val();
    var action = "Add";
    if (isFavourite.val() === "True") {
        action = "Remove";
        isFavourite.val("False");
    }
    else {
        isFavourite.val("True");
    }

    $.ajax({
        type: "POST",
        url: "/Property/ToggleFavourite",
        data: { propertyId: id, action: action },
        dataType: "json",
        success: function (data) {
            HideLoader();

            if (action === "Add")
                heartIcon.addClass("fa-heart-red");
            else
                heartIcon.removeClass("fa-heart-red");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (xhr.status === 401) {
                HideLoader();
                location.href = "/Account/Login";
            } else {
                alert(thrownError);
            }
        }
    });
}

function RemoveFromFavourites() {
    ShowLoader();

    var propertyId = $('#modal-myvalue').val();
    $.ajax({
        type: "POST",
        url: "/Profile/DeleteFavourite",
        data: { id: propertyId },
        dataType: "text",
        success: function (result) {
            $("body").html(result);
            HideLoader();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

function Notify(alertType, message) {
    if (alertType === "Success") {
        $("#notification-wrapper").html(NotifySuccess(message));
    }
    else if (alertType === "Error") {
        $("#notification-wrapper").html(NotifyError(message));
    }
    else {
        $("#notification-wrapper").empty();
    }

    $("#notification-wrapper").fadeIn().delay(5000).fadeOut();
}

function NotifySuccess(message) {
    return "<div class='alert alert-success alert-dismissible fade show' role='alert'>" +
        "<strong>Thank you!</strong> " + message +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
        "<span aria-hidden='true'>&times;</span>" +
        "</button></div>";
}

function NotifyError(message) {
    return "<div class='alert alert-danger alert-dismissible fade show' role='alert'>" +
        "<strong>Oops!</strong> " + message +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
        "<span aria-hidden='true'>&times;</span>" +
        "</button></div>";
}