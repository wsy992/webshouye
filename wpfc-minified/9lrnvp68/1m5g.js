// source --> https://cityu.edu.mo/wp-content/plugins/mec-user-dashboard/assets/js/mec-ud.js?ver=5.2 
jQuery(document).ready(function () {
    jQuery('.mec-ud-content-wrap .mec-ud-content:first-child').addClass('active');
    jQuery('.mec-ud-wrap .mec-ud-menu a:first-child').addClass('active');
    
    jQuery('.mec-ud-menu a').on('click' , function(e) {
        e.preventDefault();

        var click_id = jQuery(this).attr('data-onClick');

        jQuery('.mec-ud-content-wrap .mec-ud-content').removeClass('active');
        jQuery('.mec-ud-content-wrap').find('#'+click_id).addClass('active');

        jQuery('.mec-ud-wrap .mec-ud-menu a').removeClass('active');
        jQuery(this).addClass('active');
    });

    // Content
    var $content = jQuery('.mec-ud-wrap .col-md-9');
    
    // Profile form
    var $formNotice = jQuery('.form-notice');
    var $imgForm = jQuery('.mec-profile-form');
    var $imgNotice = $imgForm.find('.image-notice');
    var $imgPreview = $imgForm.find('.mec-ud-attachment-image');
    var $imgFile = $imgForm.find('.image-file');
    var $imgId = $imgForm.find('[name="image_id"]');
    var $userId = $imgForm.find('[name="mec_ud_userID"]');
    var $img_bg = jQuery(".mec-ud-submit-profile").find('img').clone();

    // Organizer form
    var $orgForm = jQuery('.mec-organizer-form');
    var $orgID = $orgForm.find('[name="mec_ud_orgID"]');
    var $orgFile = $orgForm.find('.image-file');
    var $orgImgId = $orgForm.find('[name="image_id"]');
    var $orgNotice = $orgForm.find('.image-notice');
    var $orgPreview = $orgForm.find('.mec-ud-attachment-image');
    var $org_bg = jQuery(".mec-ud-submit-organizer").find('img').clone();

    // Speaker form
    var $speakerForm = jQuery('.mec-speaker-form');
    var $speakerID = $speakerForm.find('[name="mec_ud_speakerID"]');
    var $speakerFile = $speakerForm.find('.image-file');
    var $speakerImgId = $speakerForm.find('[name="image_id"]');
    var $speakerNotice = $speakerForm.find('.image-notice');
    var $speakerPreview = $speakerForm.find('.mec-ud-attachment-image');
    var $speaker_bg = jQuery(".mec-ud-submit-speaker").find('img').clone();

    // Load chart Filters by default
    var $chartForm = jQuery('.mec-ud-reports-filters.mec-ud-sales-report');
    var $chartDate = $chartForm.find('input[name="mec-ud-date"]');
    var $chartData = $chartForm.find('input[name="mec-ud-data"]');
    var $chartSign = $chartForm.find('input[name="mec-ud-sign"]');

    // Pie form 
    var $PieForm = jQuery('.mec-ud-reports-filters.mec-ud-gateway-report');
    var $PieLabels = $PieForm.find('input[name="mec-ud-pie-lables"]');
    var $PieData = $PieForm.find('input[name="mec-ud-pie-data"]');
    var $PieColors = $PieForm.find('input[name="mec-ud-pie-colors"]');
    
    // Submit Chart Filter
    var $chartStart = $chartForm.find('.mec-ud-filter-start');
    var $chartEnd = $chartForm.find('.mec-ud-filter-end');
    var $chartType = $chartForm.find('select[name="type"]');
    var $chartChart = $chartForm.find('select[name="chart"]');

    // Save profile avatar
    $imgFile.on('change', function (e) {
        e.preventDefault();
        var formData = new FormData();

        formData.append('action', 'upload-attachment');
        formData.append('async-upload', $imgFile[0].files[0]);
        formData.append('name', $imgFile[0].files[0].name);
        formData.append('_wpnonce', mec_ud_config.nonce);

        jQuery.ajax({
            url: mec_ud_config.upload_url,
            data: formData,
            processData: false,
            contentType: false,
            dataType: 'json',
            type: 'POST',
            beforeSend: function () {
                $imgNotice.html('Uploading&hellip;').show();
            },
            success: function (resp) {
                if (resp.success) {
                    $imgNotice.html('Successfully uploaded.');
                    var img = jQuery('<img>', {
                        src: resp.data.url
                    });

                    $imgId.val(resp.data.id);
                    //$imgPreview.html(img).show();

                    jQuery.ajax({
                        url: mec_ud_config.ajax_url,
                        data: {
                            action: 'mec_ud_update_custom_user_profile_frontend',
                            mec_ud_userID: $userId.val(),
                            mec_ud_imgID: $imgId.val(),
                        },
                        type: 'POST',
                        success: function (data) {
                            $imgPreview.html(data).show();
                        }
                    });

                } else {
                    $imgNotice.html('Fail to upload image. Please try again.');
                    $imgFile.show();
                    $imgId.val('');
                }
            }
        });
    });

    // Save profile data
    jQuery('.mec-ud-submit-profile').on('click', function (e) {
        e.preventDefault();

        var $mec_user_fname = ($imgForm.find('[name="mec_user_fname"]').val() == '') ? $imgForm.find('[name="mec_user_fname_hidden"]') : $imgForm.find('[name="mec_user_fname"]');
        var $mec_user_lname = ($imgForm.find('[name="mec_user_lname"]').val() == '') ? $imgForm.find('[name="mec_user_lname_hidden"]') : $imgForm.find('[name="mec_user_lname"]');
        var $mec_user_email = ($imgForm.find('[name="mec_user_email"]').val() == '') ? $imgForm.find('[name="mec_user_email_hidden"]') : $imgForm.find('[name="mec_user_email"]');
        var $mec_user_url = ($imgForm.find('[name="mec_user_url"]').val() == '') ? $imgForm.find('[name="mec_user_url_hidden"]') : $imgForm.find('[name="mec_user_url"]');
        jQuery.ajax({
            url: mec_ud_config.ajax_url,
            data: {
                action: 'mec_ud_update_custom_user_profile_details_frontend',
                mec_ud_userID: $userId.val(),
                mec_ud_imgID: $imgId.val(),
                mec_user_fname: $mec_user_fname.val(),
                mec_user_lname: $mec_user_lname.val(),
                mec_user_email: $mec_user_email.val(),
                mec_user_url: $mec_user_url.val(),
            },
            type: 'POST',
            beforeSend: function () {
                jQuery(".mec-ud-submit-profile").find('img').remove();
                jQuery("<div class=\"mec-ud-saveLoader-hover\"></div>").appendTo($content);
                jQuery("<div class=\"mec-ud-saveLoader\"><div class=\"mec-loader\"></div></div>").insertBefore(".mec-ud-submit-profile span");
            },
            success: function (resp) {
                $content.find('.mec-ud-saveLoader').remove();
                $content.find('.mec-ud-saveLoader-hover').remove();
                $img_bg.insertBefore(".mec-ud-submit-profile span");
            }
        });
    })

    // Input animation
    jQuery('.mec-ud-wrap').find('.mec-ud-form').find('label').on('click', function () {
        jQuery(this).closest('.mec-ud-form').find('input , textarea , select').focus();
    });
    jQuery('.mec-ud-form').find('input , textarea , select').on('focusin', function () {
        var $this = jQuery(this),
            value = $this.val();
        $this.closest('.mec-ud-form').addClass('mec-ud-active');
    });
    jQuery('.mec-ud-form').find('input , textarea , select').on('focusout', function () {
        var $this = jQuery(this),
            value = $this.val();
        if (value == '' && $this[0]['localName'] != 'textarea' ) {
            jQuery(this).closest('.mec-ud-form').removeClass('mec-ud-active');
        }
        if ($this[0]['localName'] == 'textarea') jQuery(this).closest('.mec-ud-form').removeClass('mec-ud-active');
    });

    jQuery('.mec-ud-form').find('textarea').on('focusin', function () {
        var areaheight = jQuery(this)[0].scrollHeight;
        jQuery(this).css({
            'height': areaheight,
        })
    });

    // Save organizer image
    $orgFile.on('change', function (e) {
        e.preventDefault();

        var orgFormData = new FormData();
        orgFormData.append('action', 'upload-attachment');
        orgFormData.append('async-upload', $orgFile[0].files[0]);
        orgFormData.append('name', $orgFile[0].files[0].name);
        orgFormData.append('_wpnonce', mec_ud_config.nonce);

        jQuery.ajax({
            url: mec_ud_config.upload_url,
            data: orgFormData,
            processData: false,
            contentType: false,
            dataType: 'json',
            type: 'POST',
            beforeSend: function () {
                $orgNotice.html('Uploading&hellip;').show();
            },
            success: function (resp) {
                if (resp.success) {
                    $orgNotice.html('Successfully uploaded.');
                    var img = jQuery('<img>', {
                        src: resp.data.url
                    });
                    $orgImgId.val(resp.data.id);
                    //$orgPreview.html(img).show();

                    jQuery.ajax({
                        url: mec_ud_config.ajax_url,
                        data: {
                            action: 'mec_ud_update_organizer_thumbnail',
                            mec_ud_orgID: $orgID.val(),
                            mec_ud_orgImgID: $orgImgId.val(),
                        },
                        type: 'POST',
                        success: function (data) {
                            $orgPreview.html(img).show();
                        }
                    });

                } else {
                    $orgNotice.html('Fail to upload image. Please try again.');
                    $orgFile.show();
                    $orgImgId.val('');
                }
            }
        });
    });

    // Save orgaznizer data
    jQuery('.mec-ud-submit-organizer').on('click', function (e) {
        e.preventDefault();

        var $mec_organizer_name = ($orgForm.find('[name="mec_organizer_name"]').val() == '') ? $orgForm.find('[name="mec_organizer_name_hidden"]') : $orgForm.find('[name="mec_organizer_name"]');
        var $mec_organizer_description = ($orgForm.find('[name="mec_organizer_desc"]').val() == '') ? $orgForm.find('[name="mec_organizer_desc_hidden"]') : $orgForm.find('[name="mec_organizer_desc"]');
        var $mec_organizer_tel = ($orgForm.find('[name="mec_organizer_tel"]').val() == '') ? $orgForm.find('[name="mec_organizer_tel_hidden"]') : $orgForm.find('[name="mec_organizer_tel"]');
        var $mec_organizer_email = ($orgForm.find('[name="mec_organizer_email"]').val() == '') ? $orgForm.find('[name="mec_organizer_email_hidden"]') : $orgForm.find('[name="mec_organizer_email"]');
        var $mec_organizer_url = ($orgForm.find('[name="mec_organizer_url"]').val() == '') ? $orgForm.find('[name="mec_organizer_url_hidden"]') : $orgForm.find('[name="mec_organizer_url"]');

        jQuery.ajax({
            url: mec_ud_config.ajax_url,
            data: {
                action: 'mec_ud_update_organizer_data',
                mec_ud_orgID: $orgID.val(),
                mec_ud_org_name: $mec_organizer_name.val(),
                mec_ud_org_desc: $mec_organizer_description.val(),
                mec_ud_org_tel: $mec_organizer_tel.val(),
                mec_ud_org_email: $mec_organizer_email.val(),
                mec_ud_org_url: $mec_organizer_url.val(),
                mec_ud_orgImgID: $orgImgId.val(),
            },
            type: 'POST',
            beforeSend: function () {
                jQuery(".mec-ud-submit-organizer").find('img').remove();
                jQuery("<div class=\"mec-ud-saveLoader-hover\"></div>").appendTo($orgForm);
                jQuery("<div class=\"mec-ud-saveLoader\"><div class=\"mec-loader\"></div></div>").insertBefore(".mec-ud-submit-organizer span");
            },
            success: function (resp) {
                $orgForm.find('.mec-ud-saveLoader').remove();
                $orgForm.find('.mec-ud-saveLoader-hover').remove();
                $img_bg.insertBefore(".mec-ud-submit-organizer span");
            }
        });

    });


    // Save speaker image
    $speakerFile.on('change', function (e) {
        e.preventDefault();

        var speakerFormData = new FormData();
        speakerFormData.append('action', 'upload-attachment');
        speakerFormData.append('async-upload', $speakerFile[0].files[0]);
        speakerFormData.append('name', $speakerFile[0].files[0].name);
        speakerFormData.append('_wpnonce', mec_ud_config.nonce);

        jQuery.ajax({
            url: mec_ud_config.upload_url,
            data: speakerFormData,
            processData: false,
            contentType: false,
            dataType: 'json',
            type: 'POST',
            beforeSend: function () {
                $speakerNotice.html('Uploading&hellip;').show();
            },
            success: function (resp) {
                if (resp.success) {
                    $speakerNotice.html('Successfully uploaded.');
                    var img = jQuery('<img>', {
                        src: resp.data.url
                    });
                    $speakerImgId.val(resp.data.id);
                    //$speakerPreview.html(img).show();

                    jQuery.ajax({
                        url: mec_ud_config.ajax_url,
                        data: {
                            action: 'mec_ud_update_speaker_thumbnail',
                            mec_ud_speakerID: $speakerID.val(),
                            mec_ud_speakerImgID: $speakerImgId.val(),
                        },
                        type: 'POST',
                        success: function (data) {
                            $speakerPreview.html(img).show();
                        }
                    });

                } else {
                    $speakerNotice.html('Fail to upload image. Please try again.');
                    $speakerFile.show();
                    $speakerImgId.val('');
                }
            }
        });
    });

    // Save speaker data
    // jasper20211231 0941 原前端添加數據操作
    jQuery('.mec-ud-submit-speaker').on('click', function (e) {
        e.preventDefault();

        var $mec_speaker_name = ($speakerForm.find('[name="mec_speaker_name"]').val() == '') ? $speakerForm.find('[name="mec_speaker_name_hidden"]') : $speakerForm.find('[name="mec_speaker_name"]');
        var $mec_speaker_description = ($speakerForm.find('[name="mec_speaker_desc"]').val() == '') ? $speakerForm.find('[name="mec_speaker_desc_hidden"]') : $speakerForm.find('[name="mec_speaker_desc"]');
        var $mec_speaker_job_title = ($speakerForm.find('[name="mec_speaker_job_title"]').val() == '') ? $speakerForm.find('[name="mec_speaker_job_title_hidden"]') : $speakerForm.find('[name="mec_speaker_job_title"]');
        var $mec_speaker_tel = ($speakerForm.find('[name="mec_speaker_tel"]').val() == '') ? $speakerForm.find('[name="mec_speaker_tel_hidden"]') : $speakerForm.find('[name="mec_speaker_tel"]');
        var $mec_speaker_email = ($speakerForm.find('[name="mec_speaker_email"]').val() == '') ? $speakerForm.find('[name="mec_speaker_email_hidden"]') : $speakerForm.find('[name="mec_speaker_email"]');
        var $mec_speaker_facebook = ($speakerForm.find('[name="mec_speaker_facebook"]').val() == '') ? $speakerForm.find('[name="mec_speaker_facebook_hidden"]') : $speakerForm.find('[name="mec_speaker_facebook"]');
        var $mec_speaker_instagram = ($speakerForm.find('[name="mec_speaker_instagram"]').val() == '') ? $speakerForm.find('[name="mec_speaker_instagram_hidden"]') : $speakerForm.find('[name="mec_speaker_instagram"]');
        var $mec_speaker_twitter = ($speakerForm.find('[name="mec_speaker_twitter"]').val() == '') ? $speakerForm.find('[name="mec_speaker_twitter_hidden"]') : $speakerForm.find('[name="mec_speaker_twitter"]');

        jQuery.ajax({
            url: mec_ud_config.ajax_url,
            data: {
                action: 'mec_ud_update_speaker_data',
                mec_ud_speakerID: $speakerID.val(),
                mec_ud_speaker_name: $mec_speaker_name.val(),
                mec_ud_speaker_desc: $mec_speaker_description.val(),
                mec_ud_speaker_job_title: $mec_speaker_job_title.val(),
                mec_ud_speaker_tel: $mec_speaker_tel.val(),
                mec_ud_speaker_email: $mec_speaker_email.val(),
                mec_ud_speaker_facebook: $mec_speaker_facebook.val(),
                mec_ud_speaker_instagram: $mec_speaker_instagram.val(),
                mec_ud_speaker_twitter: $mec_speaker_twitter.val(),
                mec_ud_speakerImgID: $speakerImgId.val(),
            },
            type: 'POST',
            beforeSend: function () {
                jQuery(".mec-ud-submit-speaker").find('img').remove();
                jQuery("<div class=\"mec-ud-saveLoader-hover\"></div>").appendTo($speakerForm);
                jQuery("<div class=\"mec-ud-saveLoader\"><div class=\"mec-loader\"></div></div>").insertBefore(".mec-ud-submit-speaker span");
            },
            success: function (resp) {
                $speakerForm.find('.mec-ud-saveLoader').remove();
                $speakerForm.find('.mec-ud-saveLoader-hover').remove();
                $img_bg.insertBefore(".mec-ud-submit-speaker span");
            }
        });

    });

    // me-ud-spec-ticket clicked
    jQuery('.me-ud-spec-ticket').on('click', function(){
        jQuery('.mec-ud-menu a[data-onclick="mec-ud-tickets"]').trigger('click');
    });

    // me-ud-spec-event clicked
    jQuery('.me-ud-spec-event').on('click', function () {
        jQuery('.mec-ud-menu a[data-onclick="mec-ud-events"]').trigger('click');
    })

    // Load Report chart by default
    if (jQuery(".mec-ud-reports-filters").length > 0) {
        var udChart = document.getElementById("mec_ud_reports_chatrs");
        var mecReportChart = new Chart(udChart,
        {
            type: "line",
            data:
            {
                labels: $chartDate.val().split(','),
                datasets: [{
                    label: "Total " + $chartSign.val(),
                    data: $chartData.val().split(','),
                    backgroundColor: "rgba(159, 216, 255, 0.3)",
                    borderColor: "#36A2EB",
                    borderWidth: 1
                }]
            }
        });

        var udPie = document.getElementById("mec_ud_gateways_chart");
        var mecReportPie = new Chart(udPie,
        {
            type: "pie",
            data:
            {
                labels: $PieLabels.val().split(','),
                datasets: [{
                    data: $PieData.val().split(','),
                    backgroundColor: $PieColors.val().split(',')
                }]
            }
        });
        
    }

    // Load Pie report by default
    

    // Select Event in Reports
    jQuery('.mec-ud-reports-selectbox-event').select2();
    jQuery('.mec-ud-reports-selectbox-event').on('change', function () {
        // Change Tickets and Total
        var $tickets_and_total = jQuery('.mec-ud-reports-number');
        var $event_id = jQuery('.mec-ud-reports-selectbox-event').val();
        jQuery.ajax({
            url: mec_ud_config.ajax_url,
            data: {
                action: 'get_tickets_and_total',
                event_id: $event_id,
                start: $chartStart.val(),
                end: $chartEnd.val(),
                type: $chartType.val(),
            },
            type: 'POST',
            beforeSend: function () {
                jQuery("<div class=\"mec-ud-saveLoader-hover\"></div>").appendTo($content);
            },
            success: function (resp) {
                id_numbers = JSON.parse(resp);
                $tickets_and_total.find('.mec-ud-reports-number-spec-ticket').find('div:first-of-type').text(id_numbers[0]);
                $tickets_and_total.find('.mec-ud-reports-number-spec-total').find('div:first-of-type span:last-of-type').text(id_numbers[1]);
                $chartDate.val(id_numbers[2]);
                $chartData.val(id_numbers[3]);
                $PieLabels.val(id_numbers[4])
                $PieData.val(id_numbers[5])
                $PieColors.val(id_numbers[6])

                // Refresh chart
                mecReportChart.destroy();
                console.log($chartDate.val().split(','));
                mecReportChart = new Chart(udChart,
                {
                    type: "line",
                    data:
                    {
                        labels: $chartDate.val().split(','),
                        datasets: [{
                            label: "Total " + $chartSign.val(),
                            data: $chartData.val().split(','),
                            backgroundColor: "rgba(159, 216, 255, 0.3)",
                            borderColor: "#36A2EB",
                            borderWidth: 1
                        }]
                    }
                });

                // Refresh Pie
                mecReportPie.destroy();
                mecReportPie = new Chart(udPie,
                {
                    type: "pie",
                    data:
                    {
                        labels: $PieLabels.val().split(','),
                        datasets: [{
                            data: $PieData.val().split(','),
                            backgroundColor: $PieColors.val().split(',')
                        }]
                    }
                });

                if (jQuery('.mec-ud-reports-sales-wrap').hasClass('active')) {
                    jQuery('#mec_ud_gateways_chart').hide();
                } else if (jQuery('.mec-ud-reports-gateway-wrap').hasClass('active')) {
                    jQuery('#mec_ud_reports_chatrs').hide();
                }

                $content.find('.mec-ud-saveLoader-hover').remove();
            }
        });
    });
    
    // Filter Button 
    jQuery('.mec-ud-reports-filters button').on('click', function(event){
        event.preventDefault()
        var $event_id = jQuery('.mec-ud-reports-selectbox-event').val();
        jQuery.ajax({
            url: mec_ud_config.ajax_url,
            data: {
                action: 'chart_data_filter_button',
                event_id: $event_id,
                start: $chartStart.val(),
                end: $chartEnd.val(),
                type: $chartType.val(),
            },
            type: 'POST',
            beforeSend: function () {
                jQuery("<div class=\"mec-ud-saveLoader-hover\"></div>").appendTo($content);
            },
            success: function (resp) {
                console.log(resp);
                info = JSON.parse(resp);

                // Refresh chart
                mecReportChart.destroy();
                mecReportChart = new Chart(udChart,
                {
                    type: $chartChart.val(),
                    data:
                    {
                        labels: info[0].split(','),
                        datasets: [{
                            label: "Total " + $chartSign.val(),
                            data: info[1].split(','),
                            backgroundColor: "rgba(159, 216, 255, 0.3)",
                            borderColor: "#36A2EB",
                            borderWidth: 1
                        }]
                    }
                });

                // Refresh Pie
                mecReportPie.destroy();
                mecReportPie = new Chart(udPie,
                {
                    type: "pie",
                    data:
                    {
                        labels: info[2].split(','),
                        datasets: [{
                            data: info[3].split(','),
                            backgroundColor: info[4].split(',')
                        }]
                    }
                });

                if ( jQuery('.mec-ud-reports-sales-wrap').hasClass('active') ) {
                    jQuery('#mec_ud_gateways_chart').hide();
                } else if ( jQuery('.mec-ud-reports-gateway-wrap').hasClass('active') ) {
                    jQuery('#mec_ud_reports_chatrs').hide();
                }
                
                $content.find('.mec-ud-saveLoader-hover').remove();
            }
        });
    })

    // Pie chart
    jQuery('#mec_ud_gateways_chart').hide();
    jQuery('.mec-ud-btn-gateways').on('click', function (event) {
        event.preventDefault();
        jQuery(this).addClass('mec-selected');
        jQuery('.mec-ud-btn-sales').removeClass('mec-selected');
        jQuery('#mec_ud_gateways_chart').show();
        jQuery('#mec_ud_reports_chatrs').hide();
        jQuery('form.mec-ud-reports-filters select').hide();
        jQuery('.mec-ud-reports-sales-wrap').removeClass('active');
        jQuery('.mec-ud-reports-gateway-wrap').addClass('active').show();
    })
    jQuery('.mec-ud-btn-sales').on('click', function (event) {
        event.preventDefault();
        jQuery(this).addClass('mec-selected');
        jQuery('.mec-ud-btn-gateways').removeClass('mec-selected');
        jQuery('#mec_ud_gateways_chart').hide();
        jQuery('#mec_ud_reports_chatrs').show();
        jQuery('form.mec-ud-reports-filters select').show();
        jQuery('.mec-ud-reports-gateway-wrap').removeClass('active');
        jQuery('.mec-ud-reports-sales-wrap').addClass('active').show();
    })
    
});